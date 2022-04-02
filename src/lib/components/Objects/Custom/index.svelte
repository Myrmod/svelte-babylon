<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import * as BABYLON from 'babylonjs'
  import 'babylonjs-loaders'
  import 'babylonjs-loaders/babylonjs.loaders'
  import { getContext, onDestroy, onMount } from 'svelte'
  import { createObjectContext } from '../createObjectContext'

  const root = getRoot()
  const parentObject = getContext('object') as {
    self: BABYLON.Mesh | BABYLON.AbstractMesh
  }
  export let parent: BABYLON.Node = parentObject?.self

  export let meshesNames: Array<string> | string = ''
  export let fileName: string | File
  export let name: string = String(fileName)
  export let pluginExtension: string = undefined
  export let rootUrl: string = '/'
  export let onProgress: (event: BABYLON.ISceneLoaderProgressEvent) => void = undefined
  export let receiveShadows = false
  /**
   * @todo Setting this can cause the model to not handle collisions correctly, that's obviously bad
   */
  export let scaling: BABYLON.Vector3 = undefined

  export let position = BABYLON.Vector3.Zero()
  export let x: number = undefined
  export let y: number = undefined
  export let z: number = undefined
  export let rotation = BABYLON.Vector3.Zero()
  export let rotationQuaternion: BABYLON.Quaternion = null
  export let __root__: BABYLON.AbstractMesh = undefined
  export const context = createObjectContext(__root__)

  export let imports: BABYLON.ISceneLoaderAsyncResult = undefined
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
      if (root.imports[name]) {
        throw new Error(`"${name} has already exists."`)
      }
      imports = {
        animationGroups,
        geometries,
        lights,
        meshes,
        particleSystems,
        skeletons,
        transformNodes,
      } = await BABYLON.SceneLoader.ImportMeshAsync(
        meshesNames,
        rootUrl,
        fileName,
        root.scene,
        onProgress,
        pluginExtension,
      )

      __root__ = meshes.find(mesh => mesh.id === '__root__')
      root.imports[name] = imports

      root.scene.render()
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
    context.self?.dispose()
    delete root.imports[name]
  })

  $: if (root.imports[name] && __root__) {
    __root__.position.x = x || position.x
    __root__.position.y = y || position.y
    __root__.position.z = z || position.z
    __root__.receiveShadows = receiveShadows
    __root__.rotationQuaternion = rotationQuaternion
    __root__.rotation.x = rotation.x
    __root__.rotation.y = rotation.y
    __root__.rotation.z = rotation.z

    root.scene.render()
  }

  $: if (meshes) {
    meshes.forEach(mesh => {
      mesh.checkCollisions = checkCollisions
      if (scaling) mesh.scaling = scaling
    })
  }

  $: if (parent && __root__) {
    __root__.parent = parent
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
        mesh.actionManager = new BABYLON.ActionManager(root.scene)
      } else if (mesh?.actionManager) {
        mesh.actionManager.dispose()
      }

      if (onPick) {
        onPickIAction = mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            onPick,
            onPickCondition,
          ),
        )
      } else if (mesh?.actionManager?.actions.includes(onPickIAction)) {
        mesh.actionManager.unregisterAction(onPickIAction)
        onPickIAction = null
      }

      if (onLeftPick) {
        onLeftPickIAction = mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            onPick,
            onLeftPickCondition,
          ),
        )
      } else if (mesh?.actionManager?.actions.includes(onLeftPickIAction)) {
        mesh.actionManager.unregisterAction(onLeftPickIAction)
        onLeftPickIAction = null
      }

      if (onRightPick) {
        onRightPickIAction = mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            onPick,
            onRightPickCondition,
          ),
        )
      } else if (mesh?.actionManager?.actions.includes(onRightPickIAction)) {
        mesh.actionManager.unregisterAction(onRightPickIAction)
        onRightPickIAction = null
      }

      if (onCenterPick) {
        onCenterPickIAction = mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            onPick,
            onCenterPickCondition,
          ),
        )
      } else if (mesh?.actionManager?.actions.includes(onCenterPickIAction)) {
        mesh.actionManager.unregisterAction(onCenterPickIAction)
        onCenterPickIAction = null
      }

      if (onPickDown) {
        onPickDownIAction = mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            onPick,
            onPickDownCondition,
          ),
        )
      } else if (mesh?.actionManager?.actions.includes(onPickDownIAction)) {
        mesh.actionManager.unregisterAction(onPickDownIAction)
        onPickDownIAction = null
      }

      if (onDoublePick) {
        onDoublePickIAction = mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            onPick,
            onDoublePickCondition,
          ),
        )
      } else if (mesh?.actionManager?.actions.includes(onDoublePickIAction)) {
        mesh.actionManager.unregisterAction(onDoublePickIAction)
        onDoublePickIAction = null
      }

      if (onPickUp) {
        onPickUpIAction = mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            onPick,
            onPickUpCondition,
          ),
        )
      } else if (mesh?.actionManager?.actions.includes(onPickUpIAction)) {
        mesh.actionManager.unregisterAction(onPickUpIAction)
        onPickUpIAction = null
      }

      if (onPickOut) {
        onPickOutIAction = mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            onPick,
            onPickOutCondition,
          ),
        )
      } else if (mesh?.actionManager?.actions.includes(onPickOutIAction)) {
        mesh.actionManager.unregisterAction(onPickOutIAction)
        onPickOutIAction = null
      }

      if (onLongPress) {
        onLongPressIAction = mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            onPick,
            onLongPressCondition,
          ),
        )
      } else if (mesh?.actionManager?.actions.includes(onLongPressIAction)) {
        mesh.actionManager.unregisterAction(onLongPressIAction)
        onLongPressIAction = null
      }

      if (onPointerOver) {
        onPointerOverIAction = mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            onPick,
            onPointerOverCondition,
          ),
        )
      } else if (mesh?.actionManager?.actions.includes(onPointerOverIAction)) {
        mesh.actionManager.unregisterAction(onPointerOverIAction)
        onPointerOverIAction = null
      }

      if (onPointerOut) {
        onPointerOutIAction = mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            onPick,
            onPointerOutCondition,
          ),
        )
      } else if (mesh?.actionManager?.actions.includes(onPointerOutIAction)) {
        mesh.actionManager.unregisterAction(onPointerOutIAction)
        onPointerOutIAction = null
      }

      if (onEveryFrame) {
        onEveryFrameIAction = mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            onPick,
            onEveryFrameCondition,
          ),
        )
      } else if (mesh?.actionManager?.actions.includes(onEveryFrameIAction)) {
        mesh.actionManager.unregisterAction(onEveryFrameIAction)
        onEveryFrameIAction = null
      }

      if (onIntersectionEnter) {
        onIntersectionEnterIAction = mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            onPick,
            onIntersectionEnterCondition,
          ),
        )
      } else if (mesh?.actionManager?.actions.includes(onIntersectionEnterIAction)) {
        mesh.actionManager.unregisterAction(onIntersectionEnterIAction)
        onIntersectionEnterIAction = null
      }

      if (onIntersectionExit) {
        onIntersectionExitIAction = mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            onPick,
            onIntersectionExitCondition,
          ),
        )
      } else if (mesh?.actionManager?.actions.includes(onIntersectionExitIAction)) {
        mesh.actionManager.unregisterAction(onIntersectionExitIAction)
        onIntersectionExitIAction = null
      }

      if (onKeyDown) {
        onKeyDownIAction = mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            onPick,
            onKeyDownCondition,
          ),
        )
      } else if (mesh?.actionManager?.actions.includes(onKeyDownIAction)) {
        mesh.actionManager.unregisterAction(onKeyDownIAction)
        onKeyDownIAction = null
      }

      if (onKeyUp) {
        onKeyUpIAction = mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            onPick,
            onKeyUpCondition,
          ),
        )
      } else if (mesh?.actionManager?.actions.includes(onKeyUpIAction)) {
        mesh.actionManager.unregisterAction(onKeyUpIAction)
        onKeyUpIAction = null
      }
    })
  }
</script>

<slot />
