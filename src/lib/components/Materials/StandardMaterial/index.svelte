<script lang="ts">
  import { createReactiveContext } from '$lib/utils/createReactiveContext'
  import type { MultiMaterial } from '@babylonjs/core/Materials/multiMaterial.js'
  import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js'
  import type { Color3 } from '@babylonjs/core/Maths/math.color'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh'
  import type { Scene } from '@babylonjs/core/scene.js'
  import { getContext, onDestroy, onMount } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'

  const scene = getContext<Writable<Scene>>('scene')

  export let name: string = 'StandardMaterial'
  export let ambientColor: Color3 = undefined
  export let emissiveColor: Color3 = undefined
  export let diffuseColor: Color3 = undefined
  export let specularColor: Color3 = undefined
  export let roughness = 1
  export let separateCullingPass = false
  export let invertNormalMapX = false
  export let invertNormalMapY = false
  export let invertRefractionY = false
  export let backfaceCulling = false

  export const material = createReactiveContext('material', new StandardMaterial(name, $scene))

  const parent = getContext<Writable<Mesh>>('object')
  const multiMaterial = getContext<Writable<MultiMaterial>>('MultiMaterial')

  onMount(() => {
    try {
      if ($multiMaterial) {
        $multiMaterial.subMaterials = [...$multiMaterial.subMaterials, $material]

        return
      }
    } catch (error) {
      console.error(error)
    }
  })

  onMount(() => {
    if (!$multiMaterial && $parent) {
      $parent.material = $material
    }
  })

  onDestroy(() => {
    $material.dispose()
  })

  $: if ($material) {
    if (specularColor) $material.specularColor = specularColor
    if (ambientColor) $material.ambientColor = ambientColor
    if (diffuseColor) $material.diffuseColor = diffuseColor
    if (emissiveColor) $material.emissiveColor = emissiveColor
  }

  $: if ($material) {
    $material.roughness = roughness
    $material.separateCullingPass = separateCullingPass
    $material.invertNormalMapX = invertNormalMapX
    $material.invertNormalMapY = invertNormalMapY
    $material.invertRefractionY = invertRefractionY
    $material.backFaceCulling = backfaceCulling
  }
</script>

<slot />
