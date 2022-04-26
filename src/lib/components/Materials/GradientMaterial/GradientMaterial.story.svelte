<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import GradientMaterial from '$lib/components/Materials/GradientMaterial/index.svelte'
  import Sphere from '$lib/components/Objects/Sphere/index.svelte'
  import { Color3 } from '@babylonjs/core/Maths/math.color.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector.js'
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <HemisphericLight />
  <DirectionalLight
    intensity={0.5}
    direction={new Vector3(-10, -20, -10)}
    position={new Vector3(2, 6, 2)}
  />
  <ArcRotateCamera target={Vector3.Zero()} radius={5} />
  <Sphere>
    <GradientMaterial topColor={Color3.Blue()} bottomColor={Color3.Yellow()} />
  </Sphere>
</Canvas>
