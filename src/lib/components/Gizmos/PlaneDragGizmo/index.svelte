<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import { PlaneDragGizmo } from '@babylonjs/core/Gizmos/planeDragGizmo'
  import type { PositionGizmo } from '@babylonjs/core/Gizmos/positionGizmo'
  import type { Color3 } from '@babylonjs/core/Maths/math.color'
  import type { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer'
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
