<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import { AxisDragGizmo } from '@babylonjs/core/Gizmos/axisDragGizmo'
  import type { PositionGizmo } from '@babylonjs/core/Gizmos/positionGizmo'
  import type { Color3 } from '@babylonjs/core/Maths/math.color'
  import type { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'AxisDragGizmo'
  export let dragAxis: Vector3
  export let color: Color3 = undefined
  export let gizmoLayer: UtilityLayerRenderer = undefined
  export let parent: PositionGizmo = undefined
  export let thickness: number = undefined

  export const gizmo = new AxisDragGizmo(dragAxis, color, gizmoLayer, parent, thickness)

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
