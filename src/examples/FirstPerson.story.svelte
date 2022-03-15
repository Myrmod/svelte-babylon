<script lang="ts" context="module">
  // WIP: https://www.youtube.com/watch?v=npt_oXGTLfg
  import { Canvas, Custom, DirectionalLight, FreeCamera, HemisphericLight } from '$lib'
  import type { PageMeta } from '@vitebook/client'
  import * as BABYLON from 'babylonjs'
  import 'babylonjs-loaders'

  export const __pageMeta: PageMeta = {
    title: 'Custom',
    description: '',
  }
</script>

<script lang="ts">
  let meshes: BABYLON.ISceneLoaderAsyncResult['meshes']
  let shadowObjects: typeof meshes
  $: {
    const temp: typeof shadowObjects = []
    if (meshes?.[0]) {
      temp.push(meshes[0])
    }
    shadowObjects = temp
  }

  // handle collisions
  $: if (meshes?.length) {
    meshes.forEach(mesh => {
      mesh.checkCollisions = true
    })
  }
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
  enablePointerLockOnClick
  collisionsEnabled
>
  <HemisphericLight intensity={0.5} />
  <DirectionalLight
    intensity={0.25}
    direction={new BABYLON.Vector3(-10, -20, -10)}
    position={new BABYLON.Vector3(2, 6, 2)}
    castShadowOf={shadowObjects}
  />
  <FreeCamera
    position={new BABYLON.Vector3(0, 20, 0)}
    applyGravity
    checkCollisions
    ellipsoid={new BABYLON.Vector3(1, 1, 1)}
  />
  <Custom
    name="level"
    rootUrl="/assets/models/"
    fileName="Prototype_Level.glb"
    scaling={new BABYLON.Vector3(1, 1, 1)}
    position={new BABYLON.Vector3(0, 2, 0)}
    bind:meshes
    receiveShadows
  />
</Canvas>
