<script lang="ts">
  import { BoundingBoxGizmo } from '@babylonjs/core/Gizmos/boundingBoxGizmo.js'
  import type { Color3 } from '@babylonjs/core/Maths/math.color'
  import type { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer'
  import { onDestroy } from 'svelte'

  export let color: Color3 = undefined
  export let gizmoLayer: UtilityLayerRenderer = undefined

  export const gizmo = new BoundingBoxGizmo(color, gizmoLayer)

  onDestroy(() => {
    gizmo.dispose()
  })
</script>
