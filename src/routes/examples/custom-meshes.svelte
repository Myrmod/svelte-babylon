<script lang="ts">
  import * as BABYLON from 'babylonjs'
  import {
    Canvas,
    FreeCamera,
    DirectionalLight,
    HemisphericLight,
    Custom,
    Skybox,
  } from 'svelte-babylon'
</script>

<Canvas
  antialiasing
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <Skybox rootUrl="/assets/textures/skybox/sky" />
  <FreeCamera
    position={new BABYLON.Vector3(2, 1.75, -8)}
    target={new BABYLON.Vector3(0, 1.75, 0)}
  />
  <DirectionalLight shadowEnabled direction={new BABYLON.Vector3(0.5, -1, 0.5)} intensity={3} />
  <HemisphericLight shadowEnabled intensity={0.1} />
  <Custom
    name="campfire"
    fileName="assets/models/campfire.glb"
    scaling={new BABYLON.Vector3(1.5, 1.5, 1.5)}
    receiveShadows
  />
</Canvas>
