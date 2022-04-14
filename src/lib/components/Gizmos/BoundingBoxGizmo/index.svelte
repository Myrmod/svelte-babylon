<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import { BoundingBoxGizmo, Color3, UtilityLayerRenderer } from '@babylonjs/core'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'BoundingBoxGizmo'
  export let color: Color3 = undefined
  export let gizmoLayer: UtilityLayerRenderer = undefined

  export const gizmo = new BoundingBoxGizmo(color, gizmoLayer)

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
