<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { getContext, onDestroy, onMount } from 'svelte'

  const root = getRoot()
  const parent = getContext('object') as BABYLON.AbstractMesh | BABYLON.Mesh

  export let name: string = 'GizmoManager'
  export let thickness: number = undefined
  export let utilityLayer: BABYLON.UtilityLayerRenderer = undefined
  export let keepDepthUtilityLayer: BABYLON.UtilityLayerRenderer = undefined
  export let positionGizmoEnabled = true
  export let rotationGizmoEnabled = true
  export let scaleGizmoEnabled = true
  export let boundingBoxGizmoEnabled = true
  export let usePointerToAttachGizmos = false

  export const gizmo = new BABYLON.GizmoManager(
    root.scene,
    thickness,
    utilityLayer,
    keepDepthUtilityLayer,
  )

  onMount(() => {
    try {
      if (!parent) {
        console.error('no parent found')

        return
      }
      if (root.gizmos[name]) return

      gizmo.attachToMesh(parent)
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
    gizmo.positionGizmoEnabled = positionGizmoEnabled
    gizmo.rotationGizmoEnabled = rotationGizmoEnabled
    gizmo.scaleGizmoEnabled = scaleGizmoEnabled
    gizmo.boundingBoxGizmoEnabled = boundingBoxGizmoEnabled
    gizmo.usePointerToAttachGizmos = usePointerToAttachGizmos

    root.scene.render()
  }
</script>
