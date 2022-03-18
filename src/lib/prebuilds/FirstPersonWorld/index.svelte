<script lang="ts" context="module">
  import type RootContext from '$lib/types'
  import * as BABYLON from 'babylonjs'
  import { onDestroy } from 'svelte'
  import {
    Box,
    Canvas,
    DirectionalLight,
    FreeCamera,
    Ground,
    HemisphericLight,
    // TargetCamera,
    PhysicsImpostor,
  } from 'svelte-babylon'
</script>

<script lang="ts">
  export let playerPosition = new BABYLON.Vector3(0, 2, 0)
  export let cameraPositionOffsett = BABYLON.Vector3.Zero()
  export let root: RootContext = undefined
  let meshes: BABYLON.ISceneLoaderAsyncResult['meshes']

  // Add new keyboard inputs for camera movement
  let camera: BABYLON.TargetCamera = undefined

  export let player: { self: BABYLON.Mesh } = undefined
  let onBeforeRenderObserver: BABYLON.Observer<unknown>

  onDestroy(() => {
    root.scene.onBeforeRenderObservable.remove(onBeforeRenderObserver)
  })

  $: if (player && camera && root.scene) {
    // camera.position = player.self.position.add(cameraPositionOffsett)
    // camera.rotationQuaternion = player.self.rotationQuaternion
    // root.scene.activeCamera = camera
  }

  export let inputs = {}
  // adds the pressed keys to inputs
  $: if (root?.scene) {
    root.scene.actionManager = new BABYLON.ActionManager(root.scene)
    root.scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyDownTrigger,
        e => (inputs[e.sourceEvent.key] = e.sourceEvent.type == 'keydown'),
      ),
    )
    root.scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyUpTrigger,
        e => (inputs[e.sourceEvent.key] = e.sourceEvent.type == 'keydown'),
      ),
    )
  }

  $: if (player && root?.scene && !playerCreated) {
    createPlayer()
  }

  let playerCreated = false
  function createPlayer() {
    // Register input to move the player.
    root.scene.onBeforeRenderObservable.remove(onBeforeRenderObserver)
    onBeforeRenderObserver = root.scene.onBeforeRenderObservable.add(() => {
      if (inputs['w']) player.self.locallyTranslate(new BABYLON.Vector3(0, 0, 0.2))
      if (inputs['a']) player.self.locallyTranslate(new BABYLON.Vector3(-0.2, 0, 0))
      if (inputs['s']) player.self.locallyTranslate(new BABYLON.Vector3(0, 0, -0.2))
      if (inputs['d']) player.self.locallyTranslate(new BABYLON.Vector3(0.2, 0, 0))
    })
    playerCreated = true
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
  <!-- <TargetCamera bind:camera parent={player?.self} /> -->
  <FreeCamera position={new BABYLON.Vector3(1, 10, 1)} />
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
      direction={new BABYLON.Vector3(-10, -20, -10)}
      position={new BABYLON.Vector3(2, 6, 2)}
      castShadowOf={meshes}
    />
  </slot>
  <slot />
</Canvas>
