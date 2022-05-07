<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import Box from '$lib/components/Objects/Box/index.svelte'
  import Ground from '$lib/components/Objects/Ground/index.svelte'
  import XRScene from '$lib/components/XRScene/index.svelte'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
</script>

<Canvas antialiasing>
  <XRScene>
    <HemisphericLight intensity={0.25} />
    <DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
    <ArcRotateCamera />
    <Box checkCollisions />
    <Ground checkCollisions options={{ width: 50, height: 50 }} y={-0.5} />
  </XRScene>
</Canvas>
