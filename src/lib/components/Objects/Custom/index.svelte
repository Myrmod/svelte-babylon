<script lang="ts">
  import { createReactiveContext } from '$lib/utils/createReactiveContext'
  import type { IAction } from '@babylonjs/core/Actions/action'
  import type { ActionEvent } from '@babylonjs/core/Actions/actionEvent'
  import { ActionManager } from '@babylonjs/core/Actions/actionManager.js'
  import type { Condition } from '@babylonjs/core/Actions/condition'
  import { ExecuteCodeAction } from '@babylonjs/core/Actions/directActions.js'
  import type {
    ISceneLoaderAsyncResult,
    ISceneLoaderProgressEvent,
  } from '@babylonjs/core/Loading/sceneLoader.js'
  import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader.js'
  import { Quaternion, Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
  import type { Scene } from '@babylonjs/core/scene'
  import '@babylonjs/loaders'
  import { getContext, onDestroy, onMount } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'

  const scene = getContext<Writable<Scene>>('scene')
  const parent = getContext<Writable<Mesh>>('object')

  export let meshesNames: Array<string> | string = ''
  export let fileName: string | File
  export let pluginExtension: string = undefined
  export let rootUrl: string = '/'
  export let onProgress: (event: ISceneLoaderProgressEvent) => void = undefined
  export let receiveShadows = false
  /**
   * @todo Setting this can cause the model to not handle collisions correctly, that's obviously bad
   */
  export let scaling: Vector3 = undefined

  export let position = Vector3.Zero()
  export let x: number = undefined
  export let y: number = undefined
  export let z: number = undefined
  export let rotation = Vector3.Zero()
  export let rotationQuaternion: Quaternion = null
  export let __root__: AbstractMesh = undefined
  export const object = createReactiveContext('object', __root__)

  export let imports: ISceneLoaderAsyncResult = undefined
  export let animationGroups: typeof imports['animationGroups'] = undefined
  export let geometries: typeof imports['geometries'] = undefined
  export let lights: typeof imports['lights'] = undefined
  export let meshes: typeof imports['meshes'] = undefined
  export let particleSystems: typeof imports['particleSystems'] = undefined
  export let skeletons: typeof imports['skeletons'] = undefined
  export let transformNodes: typeof imports['transformNodes'] = undefined
  export let checkCollisions: boolean = false

  onMount(async () => {
    try {
      imports = {
        animationGroups,
        geometries,
        lights,
        meshes,
        particleSystems,
        skeletons,
        transformNodes,
      } = await SceneLoader.ImportMeshAsync(
        meshesNames,
        rootUrl,
        fileName,
        $scene,
        onProgress,
        pluginExtension,
      )

      $object = meshes.find(mesh => mesh.id === '__root__')
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    meshes?.forEach(mesh => {
      if (mesh.actionManager) {
        mesh.actionManager?.dispose()
      }
      mesh.dispose()
    })
    $object?.dispose()
  })

  $: if ($object) {
    $object.position.x = x || position.x
    $object.position.y = y || position.y
    $object.position.z = z || position.z
    $object.receiveShadows = receiveShadows
    $object.rotationQuaternion = rotationQuaternion
    $object.rotation.x = rotation.x
    $object.rotation.y = rotation.y
    $object.rotation.z = rotation.z
  }

  $: if (meshes) {
    meshes.forEach(mesh => {
      mesh.checkCollisions = checkCollisions
      if (scaling) mesh.scaling = scaling
    })
  }

  $: if ($parent && $object) {
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

  $: if (meshes) {
    meshes.forEach(mesh => {
      if (
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
        mesh.actionManager = new ActionManager($scene)
      } else if (mesh?.actionManager) {
        mesh.actionManager.dispose()
      }

      if (onPick) {
        onPickIAction = mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPickCondition),
        )
      } else if (mesh?.actionManager?.actions.includes(onPickIAction)) {
        mesh.actionManager.unregisterAction(onPickIAction)
        onPickIAction = null
      }

      if (onLeftPick) {
        onLeftPickIAction = mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onLeftPickCondition),
        )
      } else if (mesh?.actionManager?.actions.includes(onLeftPickIAction)) {
        mesh.actionManager.unregisterAction(onLeftPickIAction)
        onLeftPickIAction = null
      }

      if (onRightPick) {
        onRightPickIAction = mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onRightPickCondition),
        )
      } else if (mesh?.actionManager?.actions.includes(onRightPickIAction)) {
        mesh.actionManager.unregisterAction(onRightPickIAction)
        onRightPickIAction = null
      }

      if (onCenterPick) {
        onCenterPickIAction = mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onCenterPickCondition),
        )
      } else if (mesh?.actionManager?.actions.includes(onCenterPickIAction)) {
        mesh.actionManager.unregisterAction(onCenterPickIAction)
        onCenterPickIAction = null
      }

      if (onPickDown) {
        onPickDownIAction = mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPickDownCondition),
        )
      } else if (mesh?.actionManager?.actions.includes(onPickDownIAction)) {
        mesh.actionManager.unregisterAction(onPickDownIAction)
        onPickDownIAction = null
      }

      if (onDoublePick) {
        onDoublePickIAction = mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onDoublePickCondition),
        )
      } else if (mesh?.actionManager?.actions.includes(onDoublePickIAction)) {
        mesh.actionManager.unregisterAction(onDoublePickIAction)
        onDoublePickIAction = null
      }

      if (onPickUp) {
        onPickUpIAction = mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPickUpCondition),
        )
      } else if (mesh?.actionManager?.actions.includes(onPickUpIAction)) {
        mesh.actionManager.unregisterAction(onPickUpIAction)
        onPickUpIAction = null
      }

      if (onPickOut) {
        onPickOutIAction = mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPickOutCondition),
        )
      } else if (mesh?.actionManager?.actions.includes(onPickOutIAction)) {
        mesh.actionManager.unregisterAction(onPickOutIAction)
        onPickOutIAction = null
      }

      if (onLongPress) {
        onLongPressIAction = mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onLongPressCondition),
        )
      } else if (mesh?.actionManager?.actions.includes(onLongPressIAction)) {
        mesh.actionManager.unregisterAction(onLongPressIAction)
        onLongPressIAction = null
      }

      if (onPointerOver) {
        onPointerOverIAction = mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPointerOverCondition),
        )
      } else if (mesh?.actionManager?.actions.includes(onPointerOverIAction)) {
        mesh.actionManager.unregisterAction(onPointerOverIAction)
        onPointerOverIAction = null
      }

      if (onPointerOut) {
        onPointerOutIAction = mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onPointerOutCondition),
        )
      } else if (mesh?.actionManager?.actions.includes(onPointerOutIAction)) {
        mesh.actionManager.unregisterAction(onPointerOutIAction)
        onPointerOutIAction = null
      }

      if (onEveryFrame) {
        onEveryFrameIAction = mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onEveryFrameCondition),
        )
      } else if (mesh?.actionManager?.actions.includes(onEveryFrameIAction)) {
        mesh.actionManager.unregisterAction(onEveryFrameIAction)
        onEveryFrameIAction = null
      }

      if (onIntersectionEnter) {
        onIntersectionEnterIAction = mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onIntersectionEnterCondition),
        )
      } else if (mesh?.actionManager?.actions.includes(onIntersectionEnterIAction)) {
        mesh.actionManager.unregisterAction(onIntersectionEnterIAction)
        onIntersectionEnterIAction = null
      }

      if (onIntersectionExit) {
        onIntersectionExitIAction = mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onIntersectionExitCondition),
        )
      } else if (mesh?.actionManager?.actions.includes(onIntersectionExitIAction)) {
        mesh.actionManager.unregisterAction(onIntersectionExitIAction)
        onIntersectionExitIAction = null
      }

      if (onKeyDown) {
        onKeyDownIAction = mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onKeyDownCondition),
        )
      } else if (mesh?.actionManager?.actions.includes(onKeyDownIAction)) {
        mesh.actionManager.unregisterAction(onKeyDownIAction)
        onKeyDownIAction = null
      }

      if (onKeyUp) {
        onKeyUpIAction = mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, onPick, onKeyUpCondition),
        )
      } else if (mesh?.actionManager?.actions.includes(onKeyUpIAction)) {
        mesh.actionManager.unregisterAction(onKeyUpIAction)
        onKeyUpIAction = null
      }
    })
  }
</script>

<slot />
