<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import GUI from '$lib/components/GUI/index.svelte'
  import TextButton from '$lib/components/GUI/TextButton/index.svelte'
  import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import Box from '$lib/components/Objects/Box/index.svelte'
  import Scene from '$lib/components/Scene/index.svelte'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'

  function handleClick() {
    alert('clicked button')
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
    />
    <ArcRotateCamera />
    <Box />
    <GUI>
      <TextButton
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
