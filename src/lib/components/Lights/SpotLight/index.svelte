<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  import { createLightContext } from '../createLightContext'

  const root = getRoot()

  export let name: string = 'SpotLight'
  export let direction = BABYLON.Vector3.Zero()
  export let position = BABYLON.Vector3.Zero()
  export let angle = Math.PI / 3
  export let exponent = 2
  export let shadowEnabled = true
  export let intensity = 1
  export const light = createLightContext(
    new BABYLON.SpotLight(name, position, direction, angle, exponent, root.scene),
  )

  onMount(() => {
    try {
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

    root.scene.render()
  }
</script>

<slot />
