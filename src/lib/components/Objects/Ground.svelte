<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'Ground'
  export let options = {}
  export let receiveShadows = false
  export const object = root.objects[name]

  onMount(() => {
    try {
      root.objects[name] = BABYLON.MeshBuilder.CreateGround(name, options, root.scene)

      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    root.objects[name] = null
  })

  $: if (root.objects[name]) {
    root.objects[name].receiveShadows = receiveShadows
  }
</script>
