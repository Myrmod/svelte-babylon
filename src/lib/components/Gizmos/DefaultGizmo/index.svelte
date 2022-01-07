<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { getContext, onDestroy, onMount } from 'svelte'

  const root = getRoot()
  const parent = getContext('object') as BABYLON.AbstractMesh

  export let name: string = 'GizmoManager'
  export let thickness: number = undefined
  export let utilityLayer: BABYLON.UtilityLayerRenderer = undefined
  export let keepDepthUtilityLayer: BABYLON.UtilityLayerRenderer = undefined
  export let positionGizmoEnabled = true
  export let rotationGizmoEnabled = true
  export let scaleGizmoEnabled = true
  export let boundingBoxGizmoEnabled = true

  export const gizmo = new BABYLON.GizmoManager(
    root.scene,
    thickness,
    utilityLayer,
    keepDepthUtilityLayer,
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
  })

  $: if (root.gizmos[name]) {
    gizmo.positionGizmoEnabled = positionGizmoEnabled
    gizmo.rotationGizmoEnabled = rotationGizmoEnabled
    gizmo.scaleGizmoEnabled = scaleGizmoEnabled
    gizmo.boundingBoxGizmoEnabled = boundingBoxGizmoEnabled

    root.scene.render()
  }
</script>
