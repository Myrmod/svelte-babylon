<script lang="ts">
  import { AxisScaleGizmo } from '@babylonjs/core/Gizmos/axisScaleGizmo.js'
  import type { ScaleGizmo } from '@babylonjs/core/Gizmos/scaleGizmo.js'
  import type { Color3 } from '@babylonjs/core/Maths/math.color'
  import type { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer'
  import { onDestroy, onMount } from 'svelte'

  const scene = getContext<Writable<Scene>>('scene')

  export let name: string = 'AxisScaleGizmo.js'
  export let dragAxis: Vector3
  export let color: Color3 = undefined
  export let gizmoLayer: UtilityLayerRenderer = undefined
  export let parent: ScaleGizmo = undefined
  export let thickness: number = undefined

  export const gizmo = new AxisScaleGizmo(dragAxis, color, gizmoLayer, parent, thickness)

  onMount(() => {
    try {
      if ($root.gizmos[name]) return

      $root.gizmos[name] = gizmo
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    delete $root.gizmos[name]
    gizmo.dispose()
  })

  $: if ($root.gizmos[name]) {
  }
</script>
