<script lang="ts">
  import { createReactiveContext } from '$lib/utils/createReactiveContext'
  import type { IAction } from '@babylonjs/core/Actions/action'
  import type { ActionEvent } from '@babylonjs/core/Actions/actionEvent'
  import { ActionManager } from '@babylonjs/core/Actions/actionManager.js'
  import type { Condition } from '@babylonjs/core/Actions/condition'
  import { ExecuteCodeAction } from '@babylonjs/core/Actions/directActions.js'
  import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import { CreateTiledBox } from '@babylonjs/core/Meshes/Builders/tiledBoxBuilder.js'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
  import { getContext, onDestroy, onMount } from 'svelte'

  const scene = getContext<Writable<Scene>>('scene')

  export let name: string = 'TiledBox'
  export let receiveShadows = false
  export let options = {} as Parameters<typeof CreateTiledBox>[1]

  export let parent = getContext<Writable<Mesh>>('object')
  const context = createReactiveContext('object', CreateTiledBox(name, options, $scene))
  context.self.material = new StandardMaterial(`${name}-material`, $scene)

  export let position = Vector3.Zero()
  export let x: number = undefined
  export let y: number = undefined
  export let z: number = undefined
  export let checkCollisions = false
  export let rotation = Vector3.Zero()

  export let object = $root.objects[context.self.id]

  onMount(() => {
    try {
      $root.objects[context.self.id] = context
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    if (context.self.actionManager) {
      context.self.actionManager.dispose()
    }
    context.self.dispose()
    delete $root.objects[context.self.id]
  })

  $: if ($root.objects[context.self.id]) {
    context.self.position.x = x || position.x
    context.self.position.y = y || position.y
    context.self.position.z = z || position.z
    context.self.receiveShadows = receiveShadows
    context.self.checkCollisions = checkCollisions
    context.self.rotation = rotation

    object = context
  }

  $: if (parent) {
    context.self.parent = parent
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
    context.self.actionManager = new ActionManager($scene)
  } else if (context.self.actionManager) {
    context.self.actionManager.dispose()
  }

  $: if (onPick) {
    onPickIAction = context.self.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPickCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onPickIAction)) {
    context.self.actionManager.unregisterAction(onPickIAction)
    onPickIAction = null
  }

  $: if (onLeftPick) {
    onLeftPickIAction = context.self.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onLeftPickCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onLeftPickIAction)) {
    context.self.actionManager.unregisterAction(onLeftPickIAction)
    onLeftPickIAction = null
  }

  $: if (onRightPick) {
    onRightPickIAction = context.self.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onRightPickCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onRightPickIAction)) {
    context.self.actionManager.unregisterAction(onRightPickIAction)
    onRightPickIAction = null
  }

  $: if (onCenterPick) {
    onCenterPickIAction = context.self.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onCenterPickCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onCenterPickIAction)) {
    context.self.actionManager.unregisterAction(onCenterPickIAction)
    onCenterPickIAction = null
  }

  $: if (onPickDown) {
    onPickDownIAction = context.self.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPickDownCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onPickDownIAction)) {
    context.self.actionManager.unregisterAction(onPickDownIAction)
    onPickDownIAction = null
  }

  $: if (onDoublePick) {
    onDoublePickIAction = context.self.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onDoublePickCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onDoublePickIAction)) {
    context.self.actionManager.unregisterAction(onDoublePickIAction)
    onDoublePickIAction = null
  }

  $: if (onPickUp) {
    onPickUpIAction = context.self.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPickUpCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onPickUpIAction)) {
    context.self.actionManager.unregisterAction(onPickUpIAction)
    onPickUpIAction = null
  }

  $: if (onPickOut) {
    onPickOutIAction = context.self.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPickOutCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onPickOutIAction)) {
    context.self.actionManager.unregisterAction(onPickOutIAction)
    onPickOutIAction = null
  }

  $: if (onLongPress) {
    onLongPressIAction = context.self.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onLongPressCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onLongPressIAction)) {
    context.self.actionManager.unregisterAction(onLongPressIAction)
    onLongPressIAction = null
  }

  $: if (onPointerOver) {
    onPointerOverIAction = context.self.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPointerOverCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onPointerOverIAction)) {
    context.self.actionManager.unregisterAction(onPointerOverIAction)
    onPointerOverIAction = null
  }

  $: if (onPointerOut) {
    onPointerOutIAction = context.self.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPointerOutCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onPointerOutIAction)) {
    context.self.actionManager.unregisterAction(onPointerOutIAction)
    onPointerOutIAction = null
  }

  $: if (onEveryFrame) {
    onEveryFrameIAction = context.self.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onEveryFrameCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onEveryFrameIAction)) {
    context.self.actionManager.unregisterAction(onEveryFrameIAction)
    onEveryFrameIAction = null
  }

  $: if (onIntersectionEnter) {
    onIntersectionEnterIAction = context.self.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onIntersectionEnterCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onIntersectionEnterIAction)) {
    context.self.actionManager.unregisterAction(onIntersectionEnterIAction)
    onIntersectionEnterIAction = null
  }

  $: if (onIntersectionExit) {
    onIntersectionExitIAction = context.self.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onIntersectionExitCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onIntersectionExitIAction)) {
    context.self.actionManager.unregisterAction(onIntersectionExitIAction)
    onIntersectionExitIAction = null
  }

  $: if (onKeyDown) {
    onKeyDownIAction = context.self.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onKeyDownCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onKeyDownIAction)) {
    context.self.actionManager.unregisterAction(onKeyDownIAction)
    onKeyDownIAction = null
  }

  $: if (onKeyUp) {
    onKeyUpIAction = context.self.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onKeyUpCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onKeyUpIAction)) {
    context.self.actionManager.unregisterAction(onKeyUpIAction)
    onKeyUpIAction = null
  }
</script>

<slot />
