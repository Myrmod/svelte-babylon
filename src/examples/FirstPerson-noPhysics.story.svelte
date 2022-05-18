<script lang="ts" context="module">
  import type { FreeCamera as FCamera } from '@babylonjs/core/Cameras/freeCamera.js'
  import type { ISceneLoaderAsyncResult } from '@babylonjs/core/Loading/sceneLoader.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import FreeCamera from 'svelte-babylon/components/Cameras/FreeCamera/index.svelte'
  import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
  import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
  import Custom from 'svelte-babylon/components/Objects/Custom/index.svelte'
  import Scene from 'svelte-babylon/components/Scene/index.svelte'
  import type { Writable } from 'svelte/types/runtime/store'
</script>

<script lang="ts">
  let meshes: ISceneLoaderAsyncResult['meshes']

  // Add new keyboard inputs for camera movement
  let camera: Writable<FCamera>
  let keysAdded = false
  $: if (!keysAdded && $camera) {
    $camera.keysUp.push(87) // w
    $camera.keysLeft.push(65) // a
    $camera.keysDown.push(83) // s
    $camera.keysRight.push(68) // d
    keysAdded = true
  }
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <Scene enablePointerLockOnClick collisionsEnabled>
    <HemisphericLight intensity={0.5} />
    <DirectionalLight
      intensity={0.25}
      direction={new Vector3(-10, -20, -10)}
      position={new Vector3(2, 6, 2)}
      castShadowOf={meshes}
    />
    <FreeCamera
      position={new Vector3(0, 10, 0)}
      target={new Vector3(1, 4, 10)}
      applyGravity
      checkCollisions
      ellipsoid={new Vector3(0.01, 1, 0.01)}
      bind:camera
    />
    <Custom url="/assets/models/Prototype_Level.glb" bind:meshes receiveShadows checkCollisions />
  </Scene>
</Canvas>
