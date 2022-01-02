<script lang="ts">
  import * as BABYLON from 'babylonjs'
  import {
    Canvas,
    FreeCamera,
    DirectionalLight,
    HemisphericLight,
    CustomSingle,
  } from 'svelte-babylon'

  const objectPosition = new BABYLON.Vector3(0, 2, 0)
</script>

<Canvas
  antialiasing
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <FreeCamera position={new BABYLON.Vector3(-4, 5, -4)} target={objectPosition} />
  <DirectionalLight shadowEnabled direction={new BABYLON.Vector3(0, -1, 0)} intensity={0.5} />
  <HemisphericLight shadowEnabled intensity={0.25} />
  <CustomSingle
    name="Logo"
    rotation={new BABYLON.Vector3(1.61, 3.61, 1.39)}
    position={objectPosition}
    fileName="logo.glb"
  />
</Canvas>
