<script lang="ts" context="module">
  import type { PageMeta } from '@vitebook/client'
  import { ControlsAddon } from '@vitebook/client/addons'
  import * as BABYLON from 'babylonjs'
  import {
    ArcRotateCamera,
    Canvas,
    DirectionalLight,
    Disc,
    FreeCamera,
    HemisphericLight,
    HTMLMaterial,
    Skybox,
    StandardMaterial,
    StandardTexture,
  } from 'svelte-babylon'
  import Platform from './components/Platform/index.svelte'

  export const __pageMeta: PageMeta = {
    title: 'Showroom',
    description: '',
  }
</script>

<script lang="ts">
  const platforms: Array<{ self: BABYLON.Mesh }> = []
  const screens: Array<{ self: BABYLON.Mesh }> = []

  let arcCamera: BABYLON.ArcRotateCamera
  let freeCamera: BABYLON.FreeCamera
  let useFreeCamera = false
  $: if (freeCamera) {
    freeCamera.keysUp.push(87) // w
    freeCamera.keysLeft.push(65) // a
    freeCamera.keysDown.push(83) // s
    freeCamera.keysRight.push(68) // d
  }

  let object: {
    self: BABYLON.Mesh
  }

  let shadowObjects: Array<typeof object['self']>
  $: {
    shadowObjects = platforms
      .concat(screens)
      .map(v => v?.self)
      .filter(v => v)
  }

  let rotateToFacePickedFace: (
    e: BABYLON.ActionEvent,
    radius?: number,
    fps?: number,
    totalFrames?: number,
    onAnimationEnd?: any,
  ) => void
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
  enablePointerLockOnClick={useFreeCamera}
  collisionsEnabled
>
  <HemisphericLight intensity={1} />
  <DirectionalLight
    intensity={0.25}
    direction={new BABYLON.Vector3(-10, -20, -10)}
    position={new BABYLON.Vector3(2, 6, 2)}
    castShadowOf={shadowObjects}
  />
  {#if useFreeCamera}
    <FreeCamera
      position={new BABYLON.Vector3(0, 2, 0)}
      speed={0.2}
      applyGravity
      checkCollisions
      ellipsoid={new BABYLON.Vector3(0.01, 1, 0.01)}
      bind:camera={freeCamera}
    />
  {:else}
    <ArcRotateCamera
      bind:camera={arcCamera}
      target={new BABYLON.Vector3(0, 10, 0)}
      bind:rotateToFacePickedFace
      radius={50}
      beta={0}
    />
  {/if}
  <Platform
    bind:platform={platforms[0]}
    bind:screen={screens[0]}
    position={new BABYLON.Vector3(10, 0.5, 10)}
    name="Platform1"
  >
    <HTMLMaterial slot="screen" />
  </Platform>
  <Platform
    bind:platform={platforms[1]}
    bind:screen={screens[1]}
    position={new BABYLON.Vector3(-10, 0.5, 10)}
    rotation={270}
    name="Platform2"
  >
    <StandardMaterial slot="screen">
      <StandardTexture url="/assets/images/svelte-babylon.png" textureTarget="diffuseTexture" />
      <StandardTexture url="/assets/images/svelte-babylon.png" textureTarget="specularTexture" />
    </StandardMaterial>
  </Platform>
  <Platform
    bind:platform={platforms[2]}
    bind:screen={screens[2]}
    position={new BABYLON.Vector3(-10, 0.5, -10)}
    rotation={180}
    name="Platform3"
  />
  <Platform
    bind:platform={platforms[3]}
    bind:screen={screens[3]}
    position={new BABYLON.Vector3(10, 0.5, -10)}
    rotation={90}
    name="Platform4"
  />
  <!-- Base platform -->
  <Disc
    checkCollisions
    options={{ radius: 25 }}
    rotation={new BABYLON.Vector3(Math.PI / 2, 0, 0)}
    receiveShadows
  />
  <Skybox rootUrl="/assets/textures/skybox/sky" />
</Canvas>

<ControlsAddon>
  <label style="margin-top: 24px;display:block;">
    Use free camera <input type="checkbox" bind:checked={useFreeCamera} />
  </label>
</ControlsAddon>
