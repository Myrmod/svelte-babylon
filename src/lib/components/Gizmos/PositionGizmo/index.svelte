<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import { GizmoManager, PositionGizmo, UtilityLayerRenderer } from '@babylonjs/core'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'PositionGizmo'
  export let gizmoLayer: UtilityLayerRenderer = undefined
  export let thickness: number = undefined
  export const gizmoManager = new GizmoManager(root.scene)

  export const gizmo = new PositionGizmo(gizmoLayer, thickness, gizmoManager)

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
    gizmo.dispose()
  })

  $: if (root.gizmos[name]) {
    root.scene.render()
  }
</script>
