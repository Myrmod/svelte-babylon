<script lang="ts">
  import { GizmoManager } from '@babylonjs/core/Gizmos/gizmoManager.js'
  import { ScaleGizmo } from '@babylonjs/core/Gizmos/scaleGizmo.js'
  import type { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer'
  import { onDestroy, onMount } from 'svelte'

  const scene = getContext<Writable<Scene>>('scene')

  export let name: string = 'ScaleGizmo.js'
  export let gizmoLayer: UtilityLayerRenderer = undefined
  export let thickness: number = undefined
  export const gizmoManager = new GizmoManager($scene)

  export const gizmo = new ScaleGizmo(gizmoLayer, thickness, gizmoManager)

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
