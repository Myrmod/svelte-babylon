<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import LayerFromWebCam from '$lib/components/Layer/LayerFromWebCam.svelte'
  import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import Box from '$lib/components/Objects/Box/index.svelte'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
</script>

<Canvas>
  <HemisphericLight intensity={0.25} />
  <DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
  <ArcRotateCamera />
  <LayerFromWebCam />
  <Box />
</Canvas>
