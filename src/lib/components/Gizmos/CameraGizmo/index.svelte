<script lang="ts">
  import { CameraGizmo } from '@babylonjs/core/Gizmos/cameraGizmo.js'
  import type { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer'
  import { onDestroy, onMount } from 'svelte'

  const scene = getContext<Writable<Scene>>('scene')

  export let name: string = 'CameraGizmo.js'
  export let gizmoLayer: UtilityLayerRenderer = undefined

  export const gizmo = new CameraGizmo(gizmoLayer)

  onMount(() => {
    try {
      if ($root.gizmos[name]) return

      $root.gizmos[name] = gizmo

      $scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    delete $root.gizmos[name]
    gizmo.dispose()
  })

  $: if ($root.gizmos[name]) {
    $scene.render()
  }
</script>
