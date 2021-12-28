<script lang="ts">
  import * as BABYLON from 'babylonjs'
  import { Canvas, FreeCamera, DirectionalLight, HemisphericLight, Custom } from '$lib/components'

  const objectPosition = new BABYLON.Vector3(0, 2, 0)
</script>

<h1>Svelte Babylon</h1>
<div class="scene">
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
    <Custom position={objectPosition} />
  </Canvas>
</div>

<style>
  .scene {
    position: relative;
    height: calc(100vh - 10rem);
    width: 100vw;
  }
  h1 {
    display: none;
  }
</style>
