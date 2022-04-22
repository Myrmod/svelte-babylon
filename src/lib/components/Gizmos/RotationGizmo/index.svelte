<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import { GizmoManager } from '@babylonjs/core/Gizmos/gizmoManager.js'
  import { RotationGizmo, type RotationGizmoOptions } from '@babylonjs/core/Gizmos/rotationGizmo.js'
  import type { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'RotationGizmo.js'
  export let gizmoLayer: UtilityLayerRenderer = undefined
  export let tessellation: number = undefined
  export let useEulerRotation: boolean = undefined
  export let thickness: number = undefined
  export let options: RotationGizmoOptions = undefined
  export const gizmoManager = new GizmoManager(root.scene)

  export const gizmo = new RotationGizmo(
    gizmoLayer,
    tessellation,
    useEulerRotation,
    thickness,
    gizmoManager,
    options,
  )

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
