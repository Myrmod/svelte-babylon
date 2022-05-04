<script lang="ts">
  import { CameraGizmo } from '@babylonjs/core/Gizmos/cameraGizmo.js'
  import type { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer'
  import { onDestroy } from 'svelte'

  export let gizmoLayer: UtilityLayerRenderer = undefined

  export const gizmo = new CameraGizmo(gizmoLayer)

  onDestroy(() => {
    gizmo.dispose()
  })
</script>
