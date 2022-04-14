<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import { GizmoManager, Light, LightGizmo } from '@babylonjs/core'
  import { getContext, onDestroy, onMount } from 'svelte'

  const root = getRoot()
  const parent = getContext('light') as Light

  export let name: string = 'LightGizmo'
  export let scaleRatio = 1
  export const gizmo = new LightGizmo()

  const gizmoManager = new GizmoManager(root.scene)
  export let positionGizmoEnabled = true
  export let rotationGizmoEnabled = true
  export let usePointerToAttachGizmos = false

  gizmoManager.attachToMesh(gizmo.attachedMesh)

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
    gizmoManager.dispose()
    gizmo.dispose()
  })

  $: if (root.gizmos[name]) {
    gizmo.light = parent
    gizmo.scaleRatio = scaleRatio
    gizmoManager.positionGizmoEnabled = positionGizmoEnabled
    gizmoManager.rotationGizmoEnabled = rotationGizmoEnabled
    gizmoManager.usePointerToAttachGizmos = usePointerToAttachGizmos

    root.scene.render()
  }
</script>
