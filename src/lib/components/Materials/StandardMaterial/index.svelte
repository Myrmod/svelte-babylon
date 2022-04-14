<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import { Color3, StandardMaterial } from '@babylonjs/core'
  import { onDestroy, onMount } from 'svelte'
  import { createMaterialContext } from '../createMaterialContext'
  import getParent from '../getParent'

  const root = getRoot()

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

  export const material = new StandardMaterial(name, root.scene)

  createMaterialContext(material)

  export let parent = getParent()

  onMount(() => {
    try {
      if (parent.self.material) {
        console.warn(`Previous material on ${parent.self.id} will be overwritten`)
      }

      parent.self.material = material

      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    parent.self.material = null
  })

  $: if (root.objects[parent.self.id]?.self?.material) {
    if (specularColor) material.specularColor = specularColor
    if (ambientColor) material.ambientColor = ambientColor
    if (diffuseColor) material.diffuseColor = diffuseColor
    if (emissiveColor) material.emissiveColor = emissiveColor

    root.scene.render()
  }

  $: if (root.objects[parent.self.id]?.self?.material) {
    material.roughness = roughness
    material.separateCullingPass = separateCullingPass
    material.invertNormalMapX = invertNormalMapX
    material.invertNormalMapY = invertNormalMapY
    material.invertRefractionY = invertRefractionY
    material.backFaceCulling = backfaceCulling
  }
</script>

<slot />
