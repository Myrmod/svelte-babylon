<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'PointLight'
  export let position = BABYLON.Vector3.Zero()
  export let shadowEnabled = true
  export const camera = root.lights[name]

  onMount(() => {
    try {
      root.lights[name] = new BABYLON.PointLight(name, position, root.scene)

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
