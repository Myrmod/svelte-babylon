<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import Custom from '$lib/components/Objects/Custom/index.svelte'
  import Ground from '$lib/components/Objects/Ground/index.svelte'
  import Scene from '$lib/components/Scene/index.svelte'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
  import type { Writable } from 'svelte/types/runtime/store'

  let model: Writable<Mesh>
  let shadowObjects: Array<Mesh>
  $: if (model) {
    shadowObjects = [$model]
  }
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <Scene>
    <HemisphericLight intensity={0.5} />
    <DirectionalLight
      intensity={0.25}
      direction={new Vector3(-10, -20, -10)}
      position={new Vector3(2, 6, 2)}
      castShadowOf={shadowObjects}
    />
    <ArcRotateCamera target={new Vector3(0, 3, 0)} />
    <Custom
      rootUrl="/assets/models/"
      fileName="logo.glb"
      scaling={new Vector3(5, 5, 5)}
      position={new Vector3(0, 2, 0)}
      receiveShadows
      bind:object={model}
    />
    <Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
  </Scene>
</Canvas>
