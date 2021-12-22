<script lang="ts">
  import * as BABYLON from 'babylonjs'
  import { Canvas, FreeCamera, HemisphericLight, Sphere, Ground } from '$lib/components'

  const spherePosition = new BABYLON.Vector3(0, 2, 0)
</script>

<Canvas
  antialiasing
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <FreeCamera position={new BABYLON.Vector3(-4, 5, -4)} target={spherePosition} />
  <HemisphericLight shadowEnabled />
  <Sphere
    options={{ segments: 16, diameter: 2, sideOrientation: BABYLON.Mesh.FRONTSIDE }}
    position={spherePosition}
    receiveShadows
  />
  <Ground options={{ width: 6, height: 6, subdivisions: 2, updatable: false }} receiveShadows />
</Canvas>
