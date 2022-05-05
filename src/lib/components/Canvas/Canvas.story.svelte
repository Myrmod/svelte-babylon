<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import Box from '$lib/components/Objects/Box/index.svelte'
  import Scene from '$lib/components/Scene/index.svelte'
  import { Color4 } from '@babylonjs/core/Maths/math.color'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'

  let antialiasing = false
  let backgroundColor = '#454545'
  let preserveDrawingBuffer = true
  let stencil = true

  $: clearColor = Color4.FromHexString(backgroundColor)
</script>

<Canvas
  {antialiasing}
  engineOptions={{
    preserveDrawingBuffer,
    stencil,
  }}
>
  <Scene {clearColor}>
    <HemisphericLight intensity={0.25} />
    <DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
    <ArcRotateCamera />
    <Box />
  </Scene>
</Canvas>
