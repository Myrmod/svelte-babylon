<script lang="ts" context="module">
  import type RootContext from '$lib/types'
  import {
    ActionManager,
    ExecuteCodeAction,
    FreeCamera as FCamera,
    ISceneLoaderAsyncResult,
    Mesh,
    Observer,
    Vector3,
  } from '@babylonjs/core'
  import { onDestroy } from 'svelte'
  import {
    Box,
    Canvas,
    DirectionalLight,
    FreeCamera,
    Ground,
    HemisphericLight,
    PhysicsImpostor,
  } from 'svelte-babylon'
</script>

<script lang="ts">
  export let playerPosition = new Vector3(0, 2, 0)
  export let root: RootContext = undefined
  let meshes: ISceneLoaderAsyncResult['meshes']

  // Add new keyboard inputs for camera movement
  let camera: FCamera = undefined

  export let player: { self: Mesh } = undefined
  export let movementSpeed = 0.5
  export let verticalCameraDegree = 135

  let inputs = {}
  export let goForward = false
  $: goForward = inputs['w'] || inputs['ArrowUp']

  export let goLeft = false
  $: goLeft = inputs['a'] || inputs['ArrowLeft']

  export let goRight = false
  $: goRight = inputs['d'] || inputs['ArrowRight']

  export let goBackward = false
  $: goBackward = inputs['s'] || inputs['ArrowDown']

  let keyboardInputs: Observer<unknown>
  let mouseInputs: Observer<unknown>

  onDestroy(() => {
    root.scene?.onBeforeRenderObservable.remove(keyboardInputs)
  })

  // adds the pressed keys to inputs
  $: if (root?.scene) {
    root.scene.actionManager = new ActionManager(root.scene)
    root.scene.actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnKeyDownTrigger,
        e => (inputs[e.sourceEvent.key] = e.sourceEvent.type == 'keydown'),
      ),
    )
    root.scene.actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnKeyUpTrigger,
        e => (inputs[e.sourceEvent.key] = e.sourceEvent.type == 'keydown'),
      ),
    )
  }

  $: if (player && root?.scene && !controlsAdded) {
    addControls()
  }

  let controlsAdded = false
  function addControls() {
    if (!root.scene) return

    // Used for movement
    root.scene.onBeforeRenderObservable.remove(keyboardInputs)

    keyboardInputs = root.scene.onBeforeRenderObservable.add(() => {
      if (goForward)
        player.self.locallyTranslate(
          new Vector3(movementSpeed, 0, movementSpeed).multiply(
            camera.getDirection(Vector3.Forward()),
          ),
        )
      if (goLeft)
        player.self.locallyTranslate(
          new Vector3(movementSpeed, 0, movementSpeed).multiply(
            camera.getDirection(Vector3.Left()),
          ),
        )
      if (goBackward)
        player.self.locallyTranslate(
          new Vector3(movementSpeed, 0, movementSpeed).multiply(
            camera.getDirection(Vector3.Backward()),
          ),
        )
      if (goRight)
        player.self.locallyTranslate(
          new Vector3(movementSpeed, 0, movementSpeed).multiply(
            camera.getDirection(Vector3.Right()),
          ),
        )
    })

    // Used for the camera
    root.scene.onPointerObservable.remove(mouseInputs)
    mouseInputs = root.scene.onPointerObservable.add(() => {
      if (!camera) {
        console.error('no camera defined')
        return
      }
      if (root.engine.isPointerLock) {
        const verticalCameraRadiant = ((verticalCameraDegree / 2) * Math.PI) / 180
        // restrict vertical camera movement
        // top
        if (camera.rotation.x > verticalCameraRadiant) {
          camera.rotation.x = verticalCameraRadiant
        }
        // bottom
        if (camera.rotation.x < -verticalCameraRadiant) {
          camera.rotation.x = -verticalCameraRadiant
        }
      }
    })
    controlsAdded = true
  }

  // remove default camera keyboard inputs
  $: if (camera?.inputs.attached.keyboard) {
    camera.inputs.remove(camera.inputs.attached.keyboard)
  }
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
  enablePointerLockOnClick
  collisionsEnabled
  bind:root
  enablePhysics
>
  <FreeCamera bind:camera position={playerPosition} parent={player?.self} />
  <Box position={playerPosition} bind:object={player}>
    <PhysicsImpostor
      options={{
        mass: 1,
        restitution: 0.75,
      }}
    />
  </Box>
  <slot name="models">
    <Ground
      options={{
        width: 20,
        height: 20,
      }}
    >
      <PhysicsImpostor options={{ mass: 0, restitution: 0.5 }} />
    </Ground>
  </slot>
  <slot name="lights">
    <HemisphericLight intensity={0.5} />
    <DirectionalLight
      intensity={0.25}
      direction={new Vector3(-10, -20, -10)}
      position={new Vector3(2, 6, 2)}
      castShadowOf={meshes}
    />
  </slot>
  <slot />
</Canvas>
