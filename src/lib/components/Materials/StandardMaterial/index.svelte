<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  import { createMaterialContext } from '../createMaterialContext'
  import getParent from '../getParent'

  const root = getRoot()

  export let name: string = 'StandardMaterial'
  export let ambientColor: BABYLON.Color3 = undefined
  export let emissiveColor: BABYLON.Color3 = undefined
  export let diffuseColor: BABYLON.Color3 = undefined
  export let specularColor: BABYLON.Color3 = undefined
  export let roughness = 1
  export let separateCullingPass = false
  export let invertNormalMapX = false
  export let invertNormalMapY = false
  export let invertRefractionY = false
  export let backfaceCulling = false

  export const material = new BABYLON.StandardMaterial(name, root.scene)

  createMaterialContext(material)

  const context = getParent()

  onMount(() => {
    try {
      if (context.self.material) {
        console.warn(`Previous material on ${context.self.id} will be overwritten`)
      }

      context.self.material = material

      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    context.self.material = null
  })

  $: if (root.objects[context.self.id]?.self?.material) {
    if (specularColor) material.specularColor = specularColor
    if (ambientColor) material.ambientColor = ambientColor
    if (diffuseColor) material.diffuseColor = diffuseColor
    if (emissiveColor) material.emissiveColor = emissiveColor

    root.scene.render()
  }

  $: if (root.objects[context.self.id]?.self?.material) {
    material.roughness = roughness
    material.separateCullingPass = separateCullingPass
    material.invertNormalMapX = invertNormalMapX
    material.invertNormalMapY = invertNormalMapY
    material.invertRefractionY = invertRefractionY
    material.backFaceCulling = backfaceCulling
  }
</script>

<slot />
