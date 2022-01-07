<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'AxisDragGizmo'
  export let dragAxis: BABYLON.Vector3
  export let color: BABYLON.Color3 = undefined
  export let gizmoLayer: BABYLON.UtilityLayerRenderer = undefined
  export let parent: BABYLON.PositionGizmo = undefined
  export let thickness: number = undefined

  export const gizmo = new BABYLON.AxisDragGizmo(dragAxis, color, gizmoLayer, parent, thickness)

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
    root.scene.render()
  }
</script>
