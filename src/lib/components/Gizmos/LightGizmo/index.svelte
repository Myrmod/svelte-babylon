<script lang="ts">
  import { GizmoManager } from '@babylonjs/core/Gizmos/gizmoManager.js'
  import { LightGizmo } from '@babylonjs/core/Gizmos/lightGizmo.js'
  import type { Light } from '@babylonjs/core/Lights/light'
  import { getContext, onDestroy, onMount } from 'svelte'

  const scene = getContext<Writable<Scene>>('scene')
  const parent = getContext('light') as Light

  export let name: string = 'LightGizmo.js'
  export let scaleRatio = 1
  export const gizmo = new LightGizmo()

  const gizmoManager = new GizmoManager($scene)
  export let positionGizmoEnabled = true
  export let rotationGizmoEnabled = true
  export let usePointerToAttachGizmos = false

  gizmoManager.attachToMesh(gizmo.attachedMesh)

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
    gizmoManager.dispose()
    gizmo.dispose()
  })

  $: if ($root.gizmos[name]) {
    gizmo.light = parent
    gizmo.scaleRatio = scaleRatio
    gizmoManager.positionGizmoEnabled = positionGizmoEnabled
    gizmoManager.rotationGizmoEnabled = rotationGizmoEnabled
    gizmoManager.usePointerToAttachGizmos = usePointerToAttachGizmos
  }
</script>
