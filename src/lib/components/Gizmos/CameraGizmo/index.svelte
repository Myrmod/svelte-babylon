<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'CameraGizmo'
  export let gizmoLayer: BABYLON.UtilityLayerRenderer = undefined

  export const gizmo = new BABYLON.CameraGizmo(gizmoLayer)

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
    root.scene.render()
  }
</script>
