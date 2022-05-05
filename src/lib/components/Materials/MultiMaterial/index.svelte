<!--
  @component A multi-material is used to apply different materials to different parts of the same object as you can see below.
 -->
<script lang="ts">
  import { createReactiveContext } from '$lib/utils/createReactiveContext'
  import { MultiMaterial } from '@babylonjs/core/Materials/multiMaterial.js'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh'
  import { SubMesh } from '@babylonjs/core/Meshes/subMesh.js'
  import type { Scene } from '@babylonjs/core/scene'
  import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'

  type $$props =
    | {
        name: string
        renderAs: 'chessboard'
        options: {
          grid: {
            w: number
            h: number
          }
        }
      }
    | {
        name: string
        renderAs: 'custom'
      }

  const dispatch = createEventDispatcher()
  const scene = getContext<Writable<Scene>>('scene')

  export let name: string = 'MultiMaterial'

  export let renderAs: 'chessboard' | 'custom' = 'chessboard'
  export let options = undefined

  export const material = createReactiveContext('MultiMaterial', new MultiMaterial(name, $scene))
  export let parent = getContext<Writable<Mesh>>('object')

  onDestroy(() => {
    $material.dispose()
  })

  onMount(() => {
    $parent.material = $material
  })

  export let materialApplied = false
  $: if ($material && $parent.material && $material.subMaterials?.length && !materialApplied) {
    if (!$parent.subMeshes) {
      $parent.subMeshes = []
    }

    switch (renderAs) {
      case 'chessboard':
        if (!options.grid) {
          throw new Error(`Unusable options provided ${JSON.stringify(options)}`)
        }

        const verticesCount = $parent.getTotalVertices()
        const tileIndicesLength = $parent.getIndices().length / (options.grid.w * options.grid.h)

        if (!$parent.subMeshes) {
          $parent.subMeshes = []
        }

        let base = 0

        for (let row = 0; row < options.grid.h; row++) {
          for (let col = 0; col < options.grid.w; col++) {
            $parent.subMeshes = [
              ...$parent.subMeshes,
              new SubMesh(
                row % $material.subMaterials.length ^ col % $material.subMaterials.length,
                0,
                verticesCount,
                base,
                tileIndicesLength,
                $parent,
              ),
            ]
            base += tileIndicesLength
          }
        }
        break

      default:
        console.warn(`render as "${renderAs}" is not defined. Type "custom" will be used instead.`)
      case 'custom':
        dispatch('updateMultiMaterial', {
          vertices: $parent.getTotalVertices(),
          indices: $parent.getIndices().length,
        })

        break
    }
    materialApplied = true
  }
</script>

{#if material}
  <slot />
{/if}
