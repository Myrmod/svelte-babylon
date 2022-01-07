<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'ScaleGizmo'
  export let gizmoLayer: BABYLON.UtilityLayerRenderer = undefined
  export let thickness: number = undefined
  export const gizmoManager = new BABYLON.GizmoManager(root.scene)

  export const gizmo = new BABYLON.ScaleGizmo(gizmoLayer, thickness, gizmoManager)

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
