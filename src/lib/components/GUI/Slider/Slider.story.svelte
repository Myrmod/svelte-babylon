<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import GUI from '$lib/components/GUI/index.svelte'
  import Slider from '$lib/components/GUI/Slider/index.svelte'
  import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import Box from '$lib/components/Objects/Box/index.svelte'
  import Scene from '$lib/components/Scene/index.svelte'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector.js'

  let value = 0
</script>

<Canvas>
  <Scene>
    <HemisphericLight intensity={0.5} />
    <DirectionalLight
      intensity={0.25}
      direction={new Vector3(-10, -20, -10)}
      position={new Vector3(2, 6, 2)}
    />
    <ArcRotateCamera />
    <GUI>
      <Box rotation={new Vector3(0, -value, 0)} />
      <Slider bind:value width="200px" height="20px" minimum={0} maximum={2 * Math.PI} />
    </GUI>
  </Scene>
</Canvas>
