<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import type { MultiMaterial } from '@babylonjs/core/Materials/multiMaterial.js'
  import { Color3 } from '@babylonjs/core/Maths/math.color'
  import { GradientMaterial } from '@babylonjs/materials/gradient/gradientMaterial.js'
  import { getContext, onDestroy, onMount } from 'svelte'
  import { createMaterialContext } from '../createMaterialContext'
  import getParent from '../getParent'

  const root = getRoot()

  export let name: string = 'GradientMaterial'
  export let separateCullingPass = false
  export let backfaceCulling = false
  export let topColor = Color3.Black()
  export let topColorAlpha = 1
  export let bottomColor = Color3.White()
  export let bottomColorAlpha = 1
  export let offset = 0.5
  export let smoothness = 1

  export const material = new GradientMaterial(name, $root.scene)

  createMaterialContext(material)

  export let parent = getParent()
  export let multiMaterial = getContext<MultiMaterial>('MultiMaterial')

  onMount(() => {
    try {
      if (multiMaterial) {
        multiMaterial.subMaterials = [...multiMaterial.subMaterials, material]

        $root.scene.render()

        return
      }

      parent.self.material = material

      $root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    parent.self.material = null
  })

  $: if ($root.objects[parent.self.id]?.self?.material) {
    material.separateCullingPass = separateCullingPass
    material.backFaceCulling = backfaceCulling
    material.topColor = topColor
    material.topColorAlpha = topColorAlpha
    material.bottomColor = bottomColor
    material.bottomColorAlpha = bottomColorAlpha
    material.offset = offset
    material.smoothness = smoothness
    parent.self.material = material
  }
</script>

<slot />
