<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'DirectionalLight'
  export let direction = BABYLON.Vector3.Zero()
  export let shadowEnabled = true
  export let intensity = 1

  export const light = new BABYLON.DirectionalLight(name, direction, root.scene)

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

    root.scene.render()
  }
</script>
