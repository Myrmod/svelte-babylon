<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'RotationGizmo'
  export let gizmoLayer: BABYLON.UtilityLayerRenderer = undefined
  export let tessellation: number = undefined
  export let useEulerRotation: boolean = undefined
  export let thickness: number = undefined
  export let options: BABYLON.RotationGizmoOptions = undefined
  export const gizmoManager = new BABYLON.GizmoManager(root.scene)

  export const gizmo = new BABYLON.RotationGizmo(
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
