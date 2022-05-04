<script lang="ts">
  import type { MultiMaterial } from '@babylonjs/core/Materials/multiMaterial.js'
  import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js'
  import type { Color3 } from '@babylonjs/core/Maths/math.color'
  import { getContext, onDestroy, onMount } from 'svelte'
  import { createMaterialContext } from '../createMaterialContext'
  import getParent from '../getParent'

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

  export const material = new StandardMaterial(name, $scene)

  createMaterialContext(material)

  export let parent = getParent()
  export let multiMaterial = getContext<MultiMaterial>('MultiMaterial')

  onMount(() => {
    try {
      if (multiMaterial) {
        multiMaterial.subMaterials = [...multiMaterial.subMaterials, material]
        $scene.render()

        return
      }

      parent.self.material = material

      $scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    parent.self.material = null
  })

  $: if ($root.objects[parent.self.id]?.self?.material) {
    if (specularColor) material.specularColor = specularColor
    if (ambientColor) material.ambientColor = ambientColor
    if (diffuseColor) material.diffuseColor = diffuseColor
    if (emissiveColor) material.emissiveColor = emissiveColor

    $scene.render()
  }

  $: if ($root.objects[parent.self.id]?.self?.material) {
    material.roughness = roughness
    material.separateCullingPass = separateCullingPass
    material.invertNormalMapX = invertNormalMapX
    material.invertNormalMapY = invertNormalMapY
    material.invertRefractionY = invertRefractionY
    material.backFaceCulling = backfaceCulling
  }
</script>

<slot />
