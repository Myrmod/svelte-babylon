<script lang="ts">
  import * as BABYLON from 'babylonjs'
  import { Canvas, ArcRotateCamera, DirectionalLight, Custom, LightGizmo } from 'svelte-babylon'

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
    <Custom
      name="campfire"
      fileName="assets/models/campfire.glb"
      scaling={new BABYLON.Vector3(1.5, 1.5, 1.5)}
      receiveShadows
    />
  </Canvas>
</div>
