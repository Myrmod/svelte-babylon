<script lang="ts">
  import * as BABYLON from 'babylonjs'
  import {
    Canvas,
    ArcRotateCamera,
    DirectionalLight,
    HemisphericLight,
    Lathe,
    StandardMaterial,
  } from 'svelte-babylon'

  const objectPosition = new BABYLON.Vector3(0, 2, 0)
</script>

<h1>Lathe</h1>

<div class="canvas">
  TODO
  <!-- <Canvas
    antialiasing
    engineOptions={{
      preserveDrawingBuffer: true,
      stencil: true,
    }}
  >
    <ArcRotateCamera target={objectPosition} />
    <DirectionalLight shadowEnabled direction={new BABYLON.Vector3(0.5, -1, 0.5)} intensity={0.5} />
    <HemisphericLight intensity={0.75} />
    <Lathe position={objectPosition} receiveShadows>
      <StandardMaterial diffuseColor={new BABYLON.Color3(1)} />
    </Lathe>
  </Canvas> -->
</div>
