<script lang="ts" context="module">
  import type { PageMeta } from '@vitebook/client'
  import * as BABYLON from 'babylonjs'
  import {
    ArcRotateCamera,
    Canvas,
    DirectionalLight,
    Ground,
    HemisphericLight,
  } from 'svelte-babylon'
  import Platform from './components/Platform/index.svelte'

  export const __pageMeta: PageMeta = {
    title: 'Showroom',
    description: '',
  }
</script>

<script lang="ts">
  const plattforms: Array<{
    position: BABYLON.Vector3
    object: { self: BABYLON.Mesh }
  }> = [
    {
      position: new BABYLON.Vector3(10, 0, -10),
      object: undefined,
    },
    {
      position: new BABYLON.Vector3(-10, 0, 10),
      object: undefined,
    },
    {
      position: new BABYLON.Vector3(10, 0, 10),
      object: undefined,
    },
    {
      position: new BABYLON.Vector3(-10, 0, -10),
      object: undefined,
    },
  ]

  let camera: BABYLON.ArcRotateCamera

  let object: {
    self: BABYLON.Mesh
  }

  let shadowObjects: Array<typeof object['self']>
  $: {
    shadowObjects = plattforms.map(v => v?.object?.self).filter(v => v)
  }

  let rotateToFacePickedFace: (
    e: BABYLON.ActionEvent,
    radius?: number,
    fps?: number,
    totalFrames?: number,
    onAnimationEnd?: any,
  ) => void
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <HemisphericLight intensity={0.5} />
  <DirectionalLight
    intensity={0.25}
    direction={new BABYLON.Vector3(-10, -20, -10)}
    position={new BABYLON.Vector3(2, 6, 2)}
    castShadowOf={shadowObjects}
  />
  <ArcRotateCamera
    bind:camera
    target={new BABYLON.Vector3(0, 10, 0)}
    bind:rotateToFacePickedFace
    radius={50}
    beta={0}
  />
  {#each plattforms as plattform, index}
    <Platform bind:object={plattforms[index].object} position={plattform.position} />
  {/each}
  <Ground options={{ width: 50, height: 50, subdivisions: 2 }} receiveShadows />
</Canvas>
