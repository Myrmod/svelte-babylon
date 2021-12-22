<script lang="ts">
  import * as BABYLON from 'babylonjs'
  import { Canvas, FreeCamera, HemisphericLight, Sphere, Ground } from '$lib/components'
</script>

<Canvas
  antialiasing
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <FreeCamera position={new BABYLON.Vector3(0, 1, 0)} />
  <HemisphericLight shadowEnabled />
  <Sphere
    options={{ segments: 16, diameter: 2, sideOrientation: BABYLON.Mesh.FRONTSIDE }}
    position={{ x: 0, y: 2, z: 0 }}
    receiveShadows
  />
  <Ground options={{ width: 6, height: 6, subdivisions: 2, updatable: false }} receiveShadows />
</Canvas>
