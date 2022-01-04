<script lang="ts">
  import * as BABYLON from 'babylonjs'
  import {
    Canvas,
    ArcRotateCamera,
    DirectionalLight,
    HemisphericLight,
    Skybox,
    StandardMaterial,
  } from 'svelte-babylon'

  const objectPosition = new BABYLON.Vector3(0, 2, 0)
</script>

<h1>Skybox</h1>

<div class="canvas">
  <Canvas
    antialiasing
    engineOptions={{
      preserveDrawingBuffer: true,
      stencil: true,
    }}
  >
    <ArcRotateCamera target={objectPosition} />
    <DirectionalLight shadowEnabled direction={new BABYLON.Vector3(0.5, -1, 0.5)} intensity={0.5} />
    <HemisphericLight intensity={0.75} />
    <Skybox rootUrl="/assets/textures/skybox/sky" />
  </Canvas>
</div>
