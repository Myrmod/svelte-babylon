<script lang="ts">
  import * as BABYLON from 'babylonjs'
  import {
    Canvas,
    FreeCamera,
    DirectionalLight,
    HemisphericLight,
    Box,
    StandardMaterial,
  } from 'svelte-babylon'

  const objectPosition = new BABYLON.Vector3(0, 2, 0)
</script>

<h1>FreeCamera</h1>

<div class="canvas">
  <Canvas
    antialiasing
    engineOptions={{
      preserveDrawingBuffer: true,
      stencil: true,
    }}
  >
    <FreeCamera target={objectPosition} position={new BABYLON.Vector3(-4, 5, -4)} />
    <DirectionalLight shadowEnabled direction={new BABYLON.Vector3(0.5, -1, 0.5)} intensity={0.5} />
    <HemisphericLight intensity={0.75} />
    <Box position={objectPosition} receiveShadows>
      <StandardMaterial diffuseColor={new BABYLON.Color3(1)} />
    </Box>
  </Canvas>
</div>
