<!--
  @component A multi-material is used to apply different materials to different parts of the same object as you can see below.
 -->
<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import { MultiMaterial } from '@babylonjs/core/Materials/multiMaterial.js'
  import { SubMesh } from '@babylonjs/core/Meshes/subMesh.js'
  import { createEventDispatcher, onDestroy, onMount, setContext } from 'svelte'
  import getParent from '../getParent'

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
  const root = getRoot()

  export let name: string = 'MultiMaterial'

  export let renderAs: 'chessboard' | 'custom' = 'chessboard'
  export let options = undefined

  export const material = new MultiMaterial(name, $root.scene)
  export let parent = getParent()

  setContext('MultiMaterial', material)

  onMount(() => {
    try {
      parent.self.material = material

      $root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    parent.self.material = null
  })

  $: if (material && parent.self?.material && material.subMaterials?.length) {
    if (!parent.self.subMeshes) {
      parent.self.subMeshes = []
    }

    switch (renderAs) {
      case 'chessboard':
        if (!options.grid) {
          throw new Error(`Unusable options provided ${JSON.stringify(options)}`)
        }

        const verticesCount = parent.self.getTotalVertices()
        const tileIndicesLength =
          parent.self.getIndices().length / (options.grid.w * options.grid.h)

        if (!parent.self.subMeshes) {
          parent.self.subMeshes = []
        }

        let base = 0

        for (let row = 0; row < options.grid.h; row++) {
          for (let col = 0; col < options.grid.w; col++) {
            parent.self.subMeshes = [
              ...parent.self.subMeshes,
              new SubMesh(
                row % material.subMaterials.length ^ col % material.subMaterials.length,
                0,
                verticesCount,
                base,
                tileIndicesLength,
                parent.self,
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
          vertices: parent.self.getTotalVertices(),
          indices: parent.self.getIndices().length,
        })

        break
    }
  }
</script>

{#if material}
  <slot />
{/if}
