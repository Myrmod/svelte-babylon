<script lang="ts">
  import { BoundingBoxGizmo } from '@babylonjs/core/Gizmos/boundingBoxGizmo.js'
  import type { Color3 } from '@babylonjs/core/Maths/math.color'
  import type { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer'
  import { onDestroy, onMount } from 'svelte'

  const scene = getContext<Writable<Scene>>('scene')

  export let name: string = 'BoundingBoxGizmo.js'
  export let color: Color3 = undefined
  export let gizmoLayer: UtilityLayerRenderer = undefined

  export const gizmo = new BoundingBoxGizmo(color, gizmoLayer)

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
