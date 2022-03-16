<script lang="ts" context="module">
  import { Canvas, Custom, DirectionalLight, FreeCamera, Ground, HemisphericLight } from '$lib'
  import type { PageMeta } from '@vitebook/client'
  import * as BABYLON from 'babylonjs'
  import 'babylonjs-loaders'

  export const __pageMeta: PageMeta = {
    title: 'Custom',
    description: '',
  }
</script>

<script lang="ts">
  let meshes: BABYLON.ISceneLoaderAsyncResult['meshes']

  // Add new keyboard inputs for camera movement
  let camera: BABYLON.FreeCamera
  $: if (camera) {
    camera.keysUp.push(87) // w
    camera.keysLeft.push(65) // a
    camera.keysDown.push(83) // s
    camera.keysRight.push(68) // d
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
>
  <HemisphericLight intensity={0.5} />
  <DirectionalLight
    intensity={0.25}
    direction={new BABYLON.Vector3(-10, -20, -10)}
    position={new BABYLON.Vector3(2, 6, 2)}
    castShadowOf={meshes}
  />
  <FreeCamera
    position={new BABYLON.Vector3(0, 20, 0)}
    applyGravity
    checkCollisions
    ellipsoid={new BABYLON.Vector3(1, 1, 1)}
    bind:camera
  />
  <Custom
    name="level"
    rootUrl="/assets/models/"
    fileName="Prototype_Level.glb"
    scaling={new BABYLON.Vector3(1, 1, 1)}
    position={new BABYLON.Vector3(0, 2, 0)}
    bind:meshes
    receiveShadows
    checkCollisions
  />
  <Ground
    options={{
      width: 20,
      height: 20,
    }}
    checkCollisions
  />
</Canvas>
