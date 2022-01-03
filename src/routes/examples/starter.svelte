<script lang="ts">
  import { TextureTargets } from '$lib/types/enums/TextureTargets'

  import * as BABYLON from 'babylonjs'
  import {
    Canvas,
    FreeCamera,
    DirectionalLight,
    Sphere,
    Ground,
    StandardMaterial,
    StandardTexture,
    Skybox,
  } from 'svelte-babylon'

  const spherePosition = new BABYLON.Vector3(0, 2, 0)

  const textures = [
    { url: '/assets/textures/metal/metal_diffuse.jpg', textureTarget: TextureTargets.DIFFUSE },
    { url: '/assets/textures/metal/metal_ao.jpg', textureTarget: TextureTargets.AMBIENT },
    { url: '/assets/textures/metal/metal_normal.jpg', textureTarget: TextureTargets.BUMP },
    { url: '/assets/textures/metal/metal_specular.jpg', textureTarget: TextureTargets.SPECULAR },
  ]
</script>

<Canvas
  antialiasing
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <Skybox rootUrl="/assets/textures/skybox/sky" />
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
      {#each textures as { url, textureTarget }}
        <StandardTexture {url} uScale={4} vScale={4} {textureTarget} />
      {/each}
    </StandardMaterial>
  </Ground>
</Canvas>
