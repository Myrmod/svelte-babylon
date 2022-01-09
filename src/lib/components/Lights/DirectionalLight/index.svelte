<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  import { createLightContext } from '../createLightContext'

  const root = getRoot()

  export let name: string = 'DirectionalLight'
  export let direction = BABYLON.Vector3.Zero()
  export let shadowEnabled = false
  export let intensity = 1
  export let diffuse: BABYLON.Color3 = BABYLON.Color3.White()
  export let specular: BABYLON.Color3 = BABYLON.Color3.White()

  export const light = createLightContext(new BABYLON.DirectionalLight(name, direction, root.scene))

  onMount(() => {
    try {
      if (root.lights[light.id]) return

      root.lights[light.id] = light

      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    root.lights[light.id] = null
  })

  $: if (root.lights[light.id]) {
    light.shadowEnabled = shadowEnabled
    light.intensity = intensity
    light.diffuse = diffuse
    light.specular = specular

    root.scene.render()
  }
</script>

<slot />
