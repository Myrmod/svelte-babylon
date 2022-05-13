<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import Ground from '$lib/components/Objects/Ground/index.svelte'
  import Plane from '$lib/components/Objects/Plane/index.svelte'
  import Scene from '$lib/components/Scene/index.svelte'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
  import type { Writable } from 'svelte/store'

  let object: Writable<Mesh>

  let shadowObjects: Array<Mesh>
  $: {
    const temp: typeof shadowObjects = []
    if ($object) {
      temp.push($object)
    }
    shadowObjects = temp
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
    <Plane y={3} bind:object />
    <Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
  </Scene>
</Canvas>
