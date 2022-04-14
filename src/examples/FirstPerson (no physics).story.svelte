<script lang="ts" context="module">
  import { FreeCamera as FCamera, ISceneLoaderAsyncResult, Vector3 } from '@babylonjs/core'
  import type { PageMeta } from '@vitebook/client'
  import { ControlsAddon } from '@vitebook/client/addons'
  import {
    Canvas,
    Custom,
    DirectionalLight,
    FreeCamera,
    Ground,
    HemisphericLight,
  } from 'svelte-babylon'
  import DescriptionAddon from 'vitebook/Addons/DescriptionAddon.svelte'

  export const __pageMeta: PageMeta = {
    title: 'First person movement',
    description: '',
  }
</script>

<script lang="ts">
  let meshes: ISceneLoaderAsyncResult['meshes']
  let showCustom = true

  // Add new keyboard inputs for camera movement
  let camera: FCamera
  $: if (camera) {
    camera.keysUp.push(87) // w
    camera.keysLeft.push(65) // a
    camera.keysDown.push(83) // s
    camera.keysRight.push(68) // d
  }

  $: if (camera && typeof showCustom === 'boolean') {
    camera.position = new Vector3(0, 10, 0)
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
    direction={new Vector3(-10, -20, -10)}
    position={new Vector3(2, 6, 2)}
    castShadowOf={meshes}
  />
  <FreeCamera
    position={new Vector3(0, 10, 0)}
    applyGravity
    checkCollisions
    ellipsoid={new Vector3(0.01, 1, 0.01)}
    bind:camera
  />
  {#if showCustom}
    <Custom
      name="Level"
      rootUrl="/assets/models/"
      fileName="Prototype_Level.glb"
      bind:meshes
      receiveShadows
      checkCollisions
    />
  {:else}
    <Ground
      options={{
        width: 20,
        height: 20,
      }}
      checkCollisions
    />
  {/if}
</Canvas>

<ControlsAddon>
  <label style="margin-top: 24px;display:block;">
    show custom <input type="checkbox" bind:checked={showCustom} />
  </label>
</ControlsAddon>

<DescriptionAddon>
  <h1>Issues</h1>
  <ul>
    <li>
      <p>
        We made the cameras ellipsoid very small so that we can walk up the ramp. That's not how it
        is supposed to be though. So we're creating a physics based approach.
      </p>
    </li>
    <li>
      <p>
        For some reason it is not possible to scale an element with collision. This causes the
        Camera to slowly fall through while moving.
      </p>
    </li>
  </ul>
</DescriptionAddon>
