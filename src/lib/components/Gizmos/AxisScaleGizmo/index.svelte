<script lang="ts">
  import { AxisScaleGizmo } from '@babylonjs/core/Gizmos/axisScaleGizmo.js'
  import type { ScaleGizmo } from '@babylonjs/core/Gizmos/scaleGizmo.js'
  import type { Color3 } from '@babylonjs/core/Maths/math.color'
  import type { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer'
  import { getContext, onDestroy } from 'svelte'
  import type { Writable } from 'svelte/store'

  const parent = getContext<Writable<ScaleGizmo>>('gizmo')

  export let dragAxis: Vector3
  export let color: Color3 = undefined
  export let gizmoLayer: UtilityLayerRenderer = undefined
  export let thickness: number = undefined

  export const gizmo = new AxisScaleGizmo(dragAxis, color, gizmoLayer, $parent, thickness)

  onDestroy(() => {
    gizmo.dispose()
  })
</script>
