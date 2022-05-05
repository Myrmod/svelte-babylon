<script lang="ts">
  import { createReactiveContext } from '$lib/utils/createReactiveContext'
  import type { IAction } from '@babylonjs/core/Actions/action'
  import type { ActionEvent } from '@babylonjs/core/Actions/actionEvent'
  import { ActionManager } from '@babylonjs/core/Actions/actionManager.js'
  import type { Condition } from '@babylonjs/core/Actions/condition'
  import { ExecuteCodeAction } from '@babylonjs/core/Actions/directActions.js'
  import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder.js'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
  import { getContext, onDestroy } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'

  const scene = getContext<Writable<Scene>>('scene')

  export let name: string = 'Sphere'
  export let receiveShadows = false
  export let options = {} as Parameters<typeof CreateSphere>[1]

  export let parent = getContext<Writable<Mesh>>('object')
  export let object = createReactiveContext('object', CreateSphere(name, options, $scene))
  $object.material = new StandardMaterial(`${name}-material`, $scene)

  export let position = Vector3.Zero()
  export let x: number = undefined
  export let y: number = undefined
  export let z: number = undefined
  export let checkCollisions = false
  export let rotation = Vector3.Zero()

  onDestroy(() => {
    if ($object.actionManager) {
      $object.actionManager.dispose()
    }
    $object.dispose()
  })

  $: if ($object) {
    $object.position.x = x || position.x
    $object.position.y = y || position.y
    $object.position.z = z || position.z
    $object.receiveShadows = receiveShadows
    $object.checkCollisions = checkCollisions
    $object.rotation = rotation
  }

  $: if ($parent) {
    $object.parent = $parent
  }

  // event handling
  export let onPick: (evt: ActionEvent) => void = undefined
  export let onPickCondition: Condition = undefined
  let onPickIAction: IAction

  export let onLeftPick: (evt: ActionEvent) => void = undefined
  export let onLeftPickCondition: Condition = undefined
  let onLeftPickIAction: IAction

  export let onRightPick: (evt: ActionEvent) => void = undefined
  export let onRightPickCondition: Condition = undefined
  let onRightPickIAction: IAction

  export let onCenterPick: (evt: ActionEvent) => void = undefined
  export let onCenterPickCondition: Condition = undefined
  let onCenterPickIAction: IAction

  export let onPickDown: (evt: ActionEvent) => void = undefined
  export let onPickDownCondition: Condition = undefined
  let onPickDownIAction: IAction

  export let onDoublePick: (evt: ActionEvent) => void = undefined
  export let onDoublePickCondition: Condition = undefined
  let onDoublePickIAction: IAction

  export let onPickUp: (evt: ActionEvent) => void = undefined
  export let onPickUpCondition: Condition = undefined
  let onPickUpIAction: IAction

  export let onPickOut: (evt: ActionEvent) => void = undefined
  export let onPickOutCondition: Condition = undefined
  let onPickOutIAction: IAction

  export let onLongPress: (evt: ActionEvent) => void = undefined
  export let onLongPressCondition: Condition = undefined
  let onLongPressIAction: IAction

  export let onPointerOver: (evt: ActionEvent) => void = undefined
  export let onPointerOverCondition: Condition = undefined
  let onPointerOverIAction: IAction

  export let onPointerOut: (evt: ActionEvent) => void = undefined
  export let onPointerOutCondition: Condition = undefined
  let onPointerOutIAction: IAction

  export let onEveryFrame: (evt: ActionEvent) => void = undefined
  export let onEveryFrameCondition: Condition = undefined
  let onEveryFrameIAction: IAction

  export let onIntersectionEnter: (evt: ActionEvent) => void = undefined
  export let onIntersectionEnterCondition: Condition = undefined
  let onIntersectionEnterIAction: IAction

  export let onIntersectionExit: (evt: ActionEvent) => void = undefined
  export let onIntersectionExitCondition: Condition = undefined
  let onIntersectionExitIAction: IAction

  export let onKeyDown: (evt: ActionEvent) => void = undefined
  export let onKeyDownCondition: Condition = undefined
  let onKeyDownIAction: IAction

  export let onKeyUp: (evt: ActionEvent) => void = undefined
  export let onKeyUpCondition: Condition = undefined
  let onKeyUpIAction: IAction

  $: if (
    onPick ||
    onLeftPick ||
    onRightPick ||
    onCenterPick ||
    onPickDown ||
    onDoublePick ||
    onPickUp ||
    onPickOut ||
    onLongPress ||
    onPointerOver ||
    onPointerOut ||
    onEveryFrame ||
    onIntersectionEnter ||
    onIntersectionExit ||
    onKeyDown ||
    onKeyUp
  ) {
    import('@babylonjs/core/Behaviors')
    $object.actionManager = new ActionManager($scene)
  } else if ($object.actionManager) {
    $object.actionManager.dispose()
  }

  $: if (onPick) {
    onPickIAction = $object.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPickCondition),
    )
  } else if ($object.actionManager?.actions.includes(onPickIAction)) {
    $object.actionManager.unregisterAction(onPickIAction)
    onPickIAction = null
  }

  $: if (onLeftPick) {
    onLeftPickIAction = $object.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onLeftPickCondition),
    )
  } else if ($object.actionManager?.actions.includes(onLeftPickIAction)) {
    $object.actionManager.unregisterAction(onLeftPickIAction)
    onLeftPickIAction = null
  }

  $: if (onRightPick) {
    onRightPickIAction = $object.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onRightPickCondition),
    )
  } else if ($object.actionManager?.actions.includes(onRightPickIAction)) {
    $object.actionManager.unregisterAction(onRightPickIAction)
    onRightPickIAction = null
  }

  $: if (onCenterPick) {
    onCenterPickIAction = $object.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onCenterPickCondition),
    )
  } else if ($object.actionManager?.actions.includes(onCenterPickIAction)) {
    $object.actionManager.unregisterAction(onCenterPickIAction)
    onCenterPickIAction = null
  }

  $: if (onPickDown) {
    onPickDownIAction = $object.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPickDownCondition),
    )
  } else if ($object.actionManager?.actions.includes(onPickDownIAction)) {
    $object.actionManager.unregisterAction(onPickDownIAction)
    onPickDownIAction = null
  }

  $: if (onDoublePick) {
    onDoublePickIAction = $object.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onDoublePickCondition),
    )
  } else if ($object.actionManager?.actions.includes(onDoublePickIAction)) {
    $object.actionManager.unregisterAction(onDoublePickIAction)
    onDoublePickIAction = null
  }

  $: if (onPickUp) {
    onPickUpIAction = $object.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPickUpCondition),
    )
  } else if ($object.actionManager?.actions.includes(onPickUpIAction)) {
    $object.actionManager.unregisterAction(onPickUpIAction)
    onPickUpIAction = null
  }

  $: if (onPickOut) {
    onPickOutIAction = $object.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPickOutCondition),
    )
  } else if ($object.actionManager?.actions.includes(onPickOutIAction)) {
    $object.actionManager.unregisterAction(onPickOutIAction)
    onPickOutIAction = null
  }

  $: if (onLongPress) {
    onLongPressIAction = $object.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onLongPressCondition),
    )
  } else if ($object.actionManager?.actions.includes(onLongPressIAction)) {
    $object.actionManager.unregisterAction(onLongPressIAction)
    onLongPressIAction = null
  }

  $: if (onPointerOver) {
    onPointerOverIAction = $object.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPointerOverCondition),
    )
  } else if ($object.actionManager?.actions.includes(onPointerOverIAction)) {
    $object.actionManager.unregisterAction(onPointerOverIAction)
    onPointerOverIAction = null
  }

  $: if (onPointerOut) {
    onPointerOutIAction = $object.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPointerOutCondition),
    )
  } else if ($object.actionManager?.actions.includes(onPointerOutIAction)) {
    $object.actionManager.unregisterAction(onPointerOutIAction)
    onPointerOutIAction = null
  }

  $: if (onEveryFrame) {
    onEveryFrameIAction = $object.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onEveryFrameCondition),
    )
  } else if ($object.actionManager?.actions.includes(onEveryFrameIAction)) {
    $object.actionManager.unregisterAction(onEveryFrameIAction)
    onEveryFrameIAction = null
  }

  $: if (onIntersectionEnter) {
    onIntersectionEnterIAction = $object.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onIntersectionEnterCondition),
    )
  } else if ($object.actionManager?.actions.includes(onIntersectionEnterIAction)) {
    $object.actionManager.unregisterAction(onIntersectionEnterIAction)
    onIntersectionEnterIAction = null
  }

  $: if (onIntersectionExit) {
    onIntersectionExitIAction = $object.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onIntersectionExitCondition),
    )
  } else if ($object.actionManager?.actions.includes(onIntersectionExitIAction)) {
    $object.actionManager.unregisterAction(onIntersectionExitIAction)
    onIntersectionExitIAction = null
  }

  $: if (onKeyDown) {
    onKeyDownIAction = $object.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onKeyDownCondition),
    )
  } else if ($object.actionManager?.actions.includes(onKeyDownIAction)) {
    $object.actionManager.unregisterAction(onKeyDownIAction)
    onKeyDownIAction = null
  }

  $: if (onKeyUp) {
    onKeyUpIAction = $object.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onKeyUpCondition),
    )
  } else if ($object.actionManager?.actions.includes(onKeyUpIAction)) {
    $object.actionManager.unregisterAction(onKeyUpIAction)
    onKeyUpIAction = null
  }
</script>

<slot />
