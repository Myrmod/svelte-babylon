<script lang="ts" context="module">
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh'
  import type { PageMeta } from '@vitebook/client'
  import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
  import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
  import Custom from 'svelte-babylon/components/Objects/Custom/index.svelte'
  import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'

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
