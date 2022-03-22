<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import type { LinesMesh } from 'babylonjs'
  import * as BABYLON from 'babylonjs'
  import { getContext, onDestroy, onMount } from 'svelte'
  import { createObjectContext } from '../createObjectContext'

  const root = getRoot()

  export let name: string = 'DashedLines'
  export let options: Parameters<typeof BABYLON.MeshBuilder.CreateDashedLines>[1]

  const parentObject = getContext('object') as {
    self: BABYLON.Mesh | BABYLON.AbstractMesh
  }
  export let parent: BABYLON.Node = parentObject?.self
  const context = createObjectContext(
    BABYLON.MeshBuilder.CreateDashedLines(name, options, root.scene),
  ) as {
    self: LinesMesh
  }

  export let position = BABYLON.Vector3.Zero()
  export let x: number = undefined
  export let y: number = undefined
  export let z: number = undefined
  export let rotation = BABYLON.Vector3.Zero()

  export let object = root.objects[context.self.id]

  onMount(() => {
    try {
      root.objects[context.self.id] = context

      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    if (context.self.actionManager) {
      context.self.actionManager.dispose()
    }
    context.self.dispose()
    delete root.objects[context.self.id]
  })

  $: if (root.objects[context.self.id]) {
    context.self.position.x = x || position.x
    context.self.position.y = y || position.y
    context.self.position.z = z || position.z
    context.self.rotation = rotation

    object = context
  }

  $: if (parent) {
    context.self.parent = parent
  }

  // event handling
  export let onPick: (evt: BABYLON.ActionEvent) => void = undefined
  export let onPickCondition: BABYLON.Condition = undefined
  let onPickIAction: BABYLON.IAction

  export let onLeftPick: (evt: BABYLON.ActionEvent) => void = undefined
  export let onLeftPickCondition: BABYLON.Condition = undefined
  let onLeftPickIAction: BABYLON.IAction

  export let onRightPick: (evt: BABYLON.ActionEvent) => void = undefined
  export let onRightPickCondition: BABYLON.Condition = undefined
  let onRightPickIAction: BABYLON.IAction

  export let onCenterPick: (evt: BABYLON.ActionEvent) => void = undefined
  export let onCenterPickCondition: BABYLON.Condition = undefined
  let onCenterPickIAction: BABYLON.IAction

  export let onPickDown: (evt: BABYLON.ActionEvent) => void = undefined
  export let onPickDownCondition: BABYLON.Condition = undefined
  let onPickDownIAction: BABYLON.IAction

  export let onDoublePick: (evt: BABYLON.ActionEvent) => void = undefined
  export let onDoublePickCondition: BABYLON.Condition = undefined
  let onDoublePickIAction: BABYLON.IAction

  export let onPickUp: (evt: BABYLON.ActionEvent) => void = undefined
  export let onPickUpCondition: BABYLON.Condition = undefined
  let onPickUpIAction: BABYLON.IAction

  export let onPickOut: (evt: BABYLON.ActionEvent) => void = undefined
  export let onPickOutCondition: BABYLON.Condition = undefined
  let onPickOutIAction: BABYLON.IAction

  export let onLongPress: (evt: BABYLON.ActionEvent) => void = undefined
  export let onLongPressCondition: BABYLON.Condition = undefined
  let onLongPressIAction: BABYLON.IAction

  export let onPointerOver: (evt: BABYLON.ActionEvent) => void = undefined
  export let onPointerOverCondition: BABYLON.Condition = undefined
  let onPointerOverIAction: BABYLON.IAction

  export let onPointerOut: (evt: BABYLON.ActionEvent) => void = undefined
  export let onPointerOutCondition: BABYLON.Condition = undefined
  let onPointerOutIAction: BABYLON.IAction

  export let onEveryFrame: (evt: BABYLON.ActionEvent) => void = undefined
  export let onEveryFrameCondition: BABYLON.Condition = undefined
  let onEveryFrameIAction: BABYLON.IAction

  export let onIntersectionEnter: (evt: BABYLON.ActionEvent) => void = undefined
  export let onIntersectionEnterCondition: BABYLON.Condition = undefined
  let onIntersectionEnterIAction: BABYLON.IAction

  export let onIntersectionExit: (evt: BABYLON.ActionEvent) => void = undefined
  export let onIntersectionExitCondition: BABYLON.Condition = undefined
  let onIntersectionExitIAction: BABYLON.IAction

  export let onKeyDown: (evt: BABYLON.ActionEvent) => void = undefined
  export let onKeyDownCondition: BABYLON.Condition = undefined
  let onKeyDownIAction: BABYLON.IAction

  export let onKeyUp: (evt: BABYLON.ActionEvent) => void = undefined
  export let onKeyUpCondition: BABYLON.Condition = undefined
  let onKeyUpIAction: BABYLON.IAction

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
    context.self.actionManager = new BABYLON.ActionManager(root.scene)
  } else if (context.self.actionManager) {
    context.self.actionManager.dispose()
  }

  $: if (onPick) {
    onPickIAction = context.self.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, onPick, onPickCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onPickIAction)) {
    context.self.actionManager.unregisterAction(onPickIAction)
    onPickIAction = null
  }

  $: if (onLeftPick) {
    onLeftPickIAction = context.self.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        onPick,
        onLeftPickCondition,
      ),
    )
  } else if (context.self.actionManager?.actions.includes(onLeftPickIAction)) {
    context.self.actionManager.unregisterAction(onLeftPickIAction)
    onLeftPickIAction = null
  }

  $: if (onRightPick) {
    onRightPickIAction = context.self.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        onPick,
        onRightPickCondition,
      ),
    )
  } else if (context.self.actionManager?.actions.includes(onRightPickIAction)) {
    context.self.actionManager.unregisterAction(onRightPickIAction)
    onRightPickIAction = null
  }

  $: if (onCenterPick) {
    onCenterPickIAction = context.self.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        onPick,
        onCenterPickCondition,
      ),
    )
  } else if (context.self.actionManager?.actions.includes(onCenterPickIAction)) {
    context.self.actionManager.unregisterAction(onCenterPickIAction)
    onCenterPickIAction = null
  }

  $: if (onPickDown) {
    onPickDownIAction = context.self.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        onPick,
        onPickDownCondition,
      ),
    )
  } else if (context.self.actionManager?.actions.includes(onPickDownIAction)) {
    context.self.actionManager.unregisterAction(onPickDownIAction)
    onPickDownIAction = null
  }

  $: if (onDoublePick) {
    onDoublePickIAction = context.self.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        onPick,
        onDoublePickCondition,
      ),
    )
  } else if (context.self.actionManager?.actions.includes(onDoublePickIAction)) {
    context.self.actionManager.unregisterAction(onDoublePickIAction)
    onDoublePickIAction = null
  }

  $: if (onPickUp) {
    onPickUpIAction = context.self.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, onPick, onPickUpCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onPickUpIAction)) {
    context.self.actionManager.unregisterAction(onPickUpIAction)
    onPickUpIAction = null
  }

  $: if (onPickOut) {
    onPickOutIAction = context.self.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        onPick,
        onPickOutCondition,
      ),
    )
  } else if (context.self.actionManager?.actions.includes(onPickOutIAction)) {
    context.self.actionManager.unregisterAction(onPickOutIAction)
    onPickOutIAction = null
  }

  $: if (onLongPress) {
    onLongPressIAction = context.self.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        onPick,
        onLongPressCondition,
      ),
    )
  } else if (context.self.actionManager?.actions.includes(onLongPressIAction)) {
    context.self.actionManager.unregisterAction(onLongPressIAction)
    onLongPressIAction = null
  }

  $: if (onPointerOver) {
    onPointerOverIAction = context.self.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        onPick,
        onPointerOverCondition,
      ),
    )
  } else if (context.self.actionManager?.actions.includes(onPointerOverIAction)) {
    context.self.actionManager.unregisterAction(onPointerOverIAction)
    onPointerOverIAction = null
  }

  $: if (onPointerOut) {
    onPointerOutIAction = context.self.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        onPick,
        onPointerOutCondition,
      ),
    )
  } else if (context.self.actionManager?.actions.includes(onPointerOutIAction)) {
    context.self.actionManager.unregisterAction(onPointerOutIAction)
    onPointerOutIAction = null
  }

  $: if (onEveryFrame) {
    onEveryFrameIAction = context.self.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        onPick,
        onEveryFrameCondition,
      ),
    )
  } else if (context.self.actionManager?.actions.includes(onEveryFrameIAction)) {
    context.self.actionManager.unregisterAction(onEveryFrameIAction)
    onEveryFrameIAction = null
  }

  $: if (onIntersectionEnter) {
    onIntersectionEnterIAction = context.self.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        onPick,
        onIntersectionEnterCondition,
      ),
    )
  } else if (context.self.actionManager?.actions.includes(onIntersectionEnterIAction)) {
    context.self.actionManager.unregisterAction(onIntersectionEnterIAction)
    onIntersectionEnterIAction = null
  }

  $: if (onIntersectionExit) {
    onIntersectionExitIAction = context.self.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        onPick,
        onIntersectionExitCondition,
      ),
    )
  } else if (context.self.actionManager?.actions.includes(onIntersectionExitIAction)) {
    context.self.actionManager.unregisterAction(onIntersectionExitIAction)
    onIntersectionExitIAction = null
  }

  $: if (onKeyDown) {
    onKeyDownIAction = context.self.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        onPick,
        onKeyDownCondition,
      ),
    )
  } else if (context.self.actionManager?.actions.includes(onKeyDownIAction)) {
    context.self.actionManager.unregisterAction(onKeyDownIAction)
    onKeyDownIAction = null
  }

  $: if (onKeyUp) {
    onKeyUpIAction = context.self.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, onPick, onKeyUpCondition),
    )
  } else if (context.self.actionManager?.actions.includes(onKeyUpIAction)) {
    context.self.actionManager.unregisterAction(onKeyUpIAction)
    onKeyUpIAction = null
  }
</script>

<slot />
