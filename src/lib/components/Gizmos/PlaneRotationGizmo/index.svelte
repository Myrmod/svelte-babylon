<script lang="ts">
  import { PlaneRotationGizmo } from '@babylonjs/core/Gizmos/planeRotationGizmo.js'
  import type { RotationGizmo } from '@babylonjs/core/Gizmos/rotationGizmo.js'
  import type { Color3 } from '@babylonjs/core/Maths/math.color'
  import type { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer'
  import { getContext, onDestroy } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'

  const parent = getContext<Writable<RotationGizmo>>('RotationGizmo')

  export let planeNormal: Vector3
  export let color: Color3 = undefined
  export let gizmoLayer: UtilityLayerRenderer = undefined
  export let tessellation: number = undefined
  export let useEulerRotation: boolean = undefined
  export let thickness: number = undefined

  export const gizmo = new PlaneRotationGizmo(
    planeNormal,
    color,
    gizmoLayer,
    tessellation,
    $parent,
    useEulerRotation,
    thickness,
  )

  onDestroy(() => {
    gizmo.dispose()
  })
</script>
