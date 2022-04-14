<script lang="ts" context="module">
  import { Mesh, Vector3 } from '@babylonjs/core'
  import type { PageMeta } from '@vitebook/client'
  import {
    ArcRotateCamera,
    Canvas,
    Custom,
    DirectionalLight,
    Ground,
    HemisphericLight,
  } from 'svelte-babylon'

  export const __pageMeta: PageMeta = {
    title: 'Custom',
    description: '',
  }
</script>

<script lang="ts">
  const objectPosition = new Vector3(0, 3, 0)

  let model: Mesh
  let shadowObjects: Array<Mesh>
  $: if (model) {
    shadowObjects = [model]
  }
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
    direction={new Vector3(-10, -20, -10)}
    position={new Vector3(2, 6, 2)}
    castShadowOf={shadowObjects}
  />
  <ArcRotateCamera target={objectPosition} />
  <Custom
    name="logo"
    rootUrl="/assets/models/"
    fileName="logo.glb"
    scaling={new Vector3(5, 5, 5)}
    position={new Vector3(0, 2, 0)}
    receiveShadows
    bind:__root__={model}
  />
  <Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
</Canvas>
