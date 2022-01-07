<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { getContext, onDestroy, onMount } from 'svelte'

  const root = getRoot()
  const parent = getContext('light') as BABYLON.Light

  export let name: string = 'LightGizmo'

  export const gizmo = new BABYLON.LightGizmo()

  onMount(() => {
    try {
      if (root.gizmos[name]) return

      root.gizmos[name] = gizmo

      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    delete root.gizmos[name]
  })

  $: if (root.gizmos[name]) {
    console.log(parent)

    root.scene.render()
  }
</script>
