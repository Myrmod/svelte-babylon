<script lang="ts">
  import * as BABYLON from 'babylonjs'
  import {
    Canvas,
    ArcRotateCamera,
    DirectionalLight,
    Box,
    Ground,
    StandardMaterial,
    LightGizmo,
  } from 'svelte-babylon'

  const objectPosition = new BABYLON.Vector3(0, 3, 0)
</script>

<h1>DirectionalLight</h1>

<div class="canvas">
  <Canvas
    antialiasing
    engineOptions={{
      preserveDrawingBuffer: true,
      stencil: true,
    }}
  >
    <ArcRotateCamera target={objectPosition} />
    <DirectionalLight shadowEnabled direction={new BABYLON.Vector3(0, -1, 0)}>
      <LightGizmo />
    </DirectionalLight>
    <Box position={objectPosition} receiveShadows>
      <StandardMaterial diffuseColor={new BABYLON.Color3(1)} />
    </Box>

    <Ground options={{ width: 6, height: 6, subdivisions: 2, updatable: false }} receiveShadows>
      <StandardMaterial diffuseColor={BABYLON.Color3.Teal()} />
    </Ground>
  </Canvas>
</div>
