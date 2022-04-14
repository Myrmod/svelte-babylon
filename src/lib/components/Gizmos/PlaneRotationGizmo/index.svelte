<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import {
    Color3,
    PlaneRotationGizmo,
    RotationGizmo,
    UtilityLayerRenderer,
    Vector3,
  } from '@babylonjs/core'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'PlaneRotationGizmo'
  export let planeNormal: Vector3
  export let color: Color3 = undefined
  export let gizmoLayer: UtilityLayerRenderer = undefined
  export let tessellation: number = undefined
  export let parent: RotationGizmo = undefined
  export let useEulerRotation: boolean = undefined
  export let thickness: number = undefined

  export const gizmo = new PlaneRotationGizmo(
    planeNormal,
    color,
    gizmoLayer,
    tessellation,
    parent,
    useEulerRotation,
    thickness,
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
