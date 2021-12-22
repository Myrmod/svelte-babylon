<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'SpotLight'
  export let direction = BABYLON.Vector3.Zero()
  export let position = BABYLON.Vector3.Zero()
  export let angle = Math.PI / 3
  export let exponent = 2
  export let shadowEnabled = true
  export const camera = root.lights[name]

  onMount(() => {
    try {
      root.lights[name] = new BABYLON.SpotLight(
        name,
        position,
        direction,
        angle,
        exponent,
        root.scene,
      )

      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    root.lights[name] = null
  })

  $: if (root.lights[name]) {
    root.lights[name].shadowEnabled = shadowEnabled
  }
</script>
