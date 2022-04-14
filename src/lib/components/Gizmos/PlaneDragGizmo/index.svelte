<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import {
    Color3,
    PlaneDragGizmo,
    PositionGizmo,
    UtilityLayerRenderer,
    Vector3,
  } from '@babylonjs/core'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'PlaneDragGizmo'
  export let dragPlaneNormal: Vector3
  export let color: Color3 = undefined
  export let gizmoLayer: UtilityLayerRenderer = undefined
  export let parent: PositionGizmo = undefined

  export const gizmo = new PlaneDragGizmo(dragPlaneNormal, color, gizmoLayer, parent)

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
