<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import Inspector from '$lib/components/Misc/Inspector/index.svelte'
  import Box from '$lib/components/Objects/Box/index.svelte'
  import Scene from '$lib/components/Scene/index.svelte'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
</script>

<Canvas antialiasing>
  <Scene>
    <HemisphericLight intensity={0.5} />
    <DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
    <ArcRotateCamera />
    <Box />
    <Inspector />
  </Scene>
</Canvas>
