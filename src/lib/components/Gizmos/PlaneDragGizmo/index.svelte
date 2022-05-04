<script lang="ts">
  import { PlaneDragGizmo } from '@babylonjs/core/Gizmos/planeDragGizmo.js'
  import type { PositionGizmo } from '@babylonjs/core/Gizmos/positionGizmo.js'
  import type { Color3 } from '@babylonjs/core/Maths/math.color'
  import type { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer'
  import { getContext, onDestroy } from 'svelte'
  import type { Writable } from 'svelte/store'

  export let dragPlaneNormal: Vector3
  export let color: Color3 = undefined
  export let gizmoLayer: UtilityLayerRenderer = undefined
  const parent = getContext<Writable<PositionGizmo>>('PositionGizmo')

  export const gizmo = new PlaneDragGizmo(dragPlaneNormal, color, gizmoLayer, $parent)

  onDestroy(() => {
    gizmo.dispose()
  })
</script>
