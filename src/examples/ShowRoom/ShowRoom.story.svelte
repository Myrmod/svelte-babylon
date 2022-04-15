<script lang="ts" context="module">
  import type { ActionEvent } from '@babylonjs/core/Actions/actionEvent'
  import type { ArcRotateCamera as ACamera } from '@babylonjs/core/Cameras/arcRotateCamera'
  import type { FreeCamera as FCamera } from '@babylonjs/core/Cameras/freeCamera'
  import type { VideoTexture as VTexture } from '@babylonjs/core/Materials/Textures/videoTexture'
  import { Color3 } from '@babylonjs/core/Maths/math.color'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh'
  import type { PageMeta } from '@vitebook/client'
  import { ControlsAddon } from '@vitebook/client/addons'
  import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
  import FreeCamera from 'svelte-babylon/components/Cameras/FreeCamera/index.svelte'
  import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
  import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
  import StandardMaterial from 'svelte-babylon/components/Materials/StandardMaterial/index.svelte'
  import Custom from 'svelte-babylon/components/Objects/Custom/index.svelte'
  import Disc from 'svelte-babylon/components/Objects/Disc/index.svelte'
  import StandardTexture from 'svelte-babylon/components/Textures/StandardTexture/index.svelte'
  import VideoTexture from 'svelte-babylon/components/Textures/VideoTexture/index.svelte'
  import Skybox from 'svelte-babylon/prebuilds/Skybox/index.svelte'
  import TextPlane from 'svelte-babylon/prebuilds/TextPlane/index.svelte'
  import type RootContext from 'svelte-babylon/types'
  import GUI from './components/GUI/index.svelte'
  import Platform from './components/Platform/index.svelte'

  export const __pageMeta: PageMeta = {
    title: 'Showroom',
    description: '',
  }
</script>

<script lang="ts">
  const platforms: Array<{ self: Mesh }> = []
  let screens: Array<{ self: Mesh }> = []
  let root: RootContext

  let arcCamera: ACamera
  let freeCamera: FCamera
  let useFreeCamera = false
  $: if (freeCamera) {
    freeCamera.keysUp.push(87) // w
    freeCamera.keysLeft.push(65) // a
    freeCamera.keysDown.push(83) // s
    freeCamera.keysRight.push(68) // d
  }

  let object: {
    self: Mesh
  }

  let customMesh: Mesh
  $: if (customMesh && root) {
    root.scene.onBeforeRenderObservable.add(() => {
      if (root.scene.activeCamera) {
        customMesh.rotate(new Vector3(1, 1, 1), 0.005)
      }
    })
  }

  let shadowObjects: Array<typeof object['self']>
  $: if (customMesh && screens?.length && platforms?.length) {
    shadowObjects = [...platforms, ...screens]
      .map(v => v?.self)
      .filter(v => v)
      .concat(customMesh)
  }

  $: {
    screens[0] = { self: customMesh }
    screens = screens
  }

  let rotateToFacePickedFace: (
    e: ActionEvent,
    radius?: number,
    fps?: number,
    totalFrames?: number,
    onAnimationEnd?: any,
  ) => void

  let videoTexture: VTexture
  let playVideo = false
  $: if (playVideo && videoTexture) {
    videoTexture.video.play()
  } else if (videoTexture) {
    videoTexture.video.pause()
  }
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
  enablePointerLockOnClick={useFreeCamera}
  collisionsEnabled
  bind:root
>
  <HemisphericLight intensity={1} />
  <DirectionalLight
    intensity={0.25}
    direction={new Vector3(-10, -20, -10)}
    position={new Vector3(20, 60, 20)}
    castShadowOf={shadowObjects}
  />
  {#if useFreeCamera}
    <FreeCamera
      position={new Vector3(0, 2, 0)}
      speed={0.2}
      applyGravity
      checkCollisions
      ellipsoid={new Vector3(0.01, 1, 0.01)}
      target={new Vector3(4, 2, 4)}
      bind:camera={freeCamera}
    />
  {:else}
    <ArcRotateCamera
      bind:camera={arcCamera}
      target={new Vector3(0, 10, 0)}
      bind:rotateToFacePickedFace
      radius={50}
      beta={0}
    />
  {/if}
  <Platform
    bind:platform={platforms[0]}
    position={new Vector3(10, 0.5, 10)}
    name="Platform1 Object"
  >
    <Custom
      name="logo"
      rootUrl="/assets/models/"
      fileName="logo.glb"
      scaling={new Vector3(7, 7, 7)}
      position={new Vector3(0, 2, 0)}
      receiveShadows
      bind:__root__={customMesh}
    />
  </Platform>
  <!-- Image on a screen -->
  <Platform
    bind:platform={platforms[1]}
    bind:screen={screens[1]}
    position={new Vector3(-10, 0.5, 10)}
    rotation={270}
    name="Platform2 Image"
  >
    <StandardMaterial slot="screen-material">
      <StandardTexture url="/assets/images/svelte-png" textureTarget="diffuseTexture" />
      <StandardTexture url="/assets/images/svelte-png" textureTarget="specularTexture" />
    </StandardMaterial>
  </Platform>
  <!-- Text -->
  <Platform
    bind:platform={platforms[2]}
    bind:screen={screens[2]}
    position={new Vector3(-10, 0.5, -10)}
    rotation={180}
    name="Platform3 Text"
  >
    <TextPlane
      slot="screen"
      text="TextPlane"
      planeOptions={{ width: 16 / 5.2, height: 9 / 5.2 }}
      backgroundColor={'#ffffff'}
      color={'#000000'}
      fontSizeMultiplier={1}
      sizeMultiplier={60}
      position={new Vector3(0, 0, -0.13)}
      checkCollisions
    />
  </Platform>
  <!-- Video -->
  <Platform
    bind:platform={platforms[3]}
    bind:screen={screens[3]}
    position={new Vector3(10, 0.5, -10)}
    rotation={90}
    name="Platform4 Video"
  >
    <StandardMaterial
      roughness={1}
      emissiveColor={Color3.White()}
      slot="screen-material"
      specularColor={Color3.Black()}
    >
      <VideoTexture
        bind:texture={videoTexture}
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />
    </StandardMaterial>
  </Platform>
  <!-- Base platform -->
  <Disc
    checkCollisions
    options={{ radius: 25 }}
    rotation={new Vector3(Math.PI / 2, 0, 0)}
    receiveShadows
  />
  <Skybox rootUrl="/assets/textures/skybox/sky" />
  {#if screens.length && !useFreeCamera}
    <GUI {screens} />
  {/if}
</Canvas>

<ControlsAddon>
  <label style="margin-top: 24px;display:block;">
    Use free camera <input type="checkbox" bind:checked={useFreeCamera} />
  </label>
  <label style="margin-top: 24px;display:block;">
    play video <input type="checkbox" bind:checked={playVideo} />
  </label>
</ControlsAddon>
