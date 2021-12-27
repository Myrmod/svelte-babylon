<script lang="ts">
  import * as BABYLON from 'babylonjs'
  import {
    Canvas,
    FreeCamera,
    DirectionalLight,
    Sphere,
    Ground,
    StandardMaterial,
    DiffuseTexture,
    AmbientTexture,
    BumpTexture,
    SpecularTexture,
  } from '$lib/components'

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
  <DirectionalLight shadowEnabled direction={new BABYLON.Vector3(0, -1, 0)} />
  <Sphere
    options={{ segments: 16, diameter: 2, sideOrientation: BABYLON.Mesh.FRONTSIDE }}
    position={spherePosition}
    receiveShadows
  >
    <StandardMaterial diffuseColor={new BABYLON.Color3(1)} />
  </Sphere>

  <Ground options={{ width: 6, height: 6, subdivisions: 2, updatable: false }} receiveShadows>
    <StandardMaterial>
      <DiffuseTexture url="/assets/textures/metal/metal_diffuse.jpg" uScale={4} vScale={4} />
      <AmbientTexture url="/assets/textures/metal/metal_ao.jpg" uScale={4} vScale={4} />
      <BumpTexture
        url="/assets/textures/metal/metal_normal.jpg"
        uScale={4}
        vScale={4}
        invertY
        invertZ
      />
      <SpecularTexture url="/assets/textures/metal/metal_specular.jpg" uScale={4} vScale={4} />
    </StandardMaterial>
  </Ground>
</Canvas>
