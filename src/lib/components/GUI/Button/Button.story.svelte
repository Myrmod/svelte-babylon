<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import Button from '$lib/components/GUI/Button/index.svelte'
  import GUI from '$lib/components/GUI/index.svelte'
  import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import Box from '$lib/components/Objects/Box/index.svelte'
  import Ground from '$lib/components/Objects/Ground/index.svelte'
  import Scene from '$lib/components/Scene/index.svelte'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
  import type { Writable } from 'svelte/types/runtime/store'

  function handleClick() {
    alert('clicked button')
  }

  let object: Writable<Mesh>

  let shadowObjects: Array<Mesh>
  $: {
    const temp: typeof shadowObjects = []
    if ($object) {
      temp.push($object)
    }
    shadowObjects = temp
  }

  const width = '150px'
  const height = '40px'
  const color = '#ffffff'
  const cornerRadius = 20
  const background = '#aaaa00'
  const text = 'Click Me'
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
    <Box y={3} bind:object />
    <Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
    <GUI>
      <Button
        onPointerUp={handleClick}
        {width}
        {height}
        {color}
        {cornerRadius}
        {background}
        {text}
      />
    </GUI>
  </Scene>
</Canvas>
