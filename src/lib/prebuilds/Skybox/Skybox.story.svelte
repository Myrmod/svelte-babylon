<script lang="ts" context="module">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import Skybox from '$lib/prebuilds/Skybox/index.svelte'
  import type { PageMeta } from '@vitebook/client'

  export const __pageMeta: PageMeta = {
    title: 'Skybox',
    description: '',
  }
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <HemisphericLight />
  <ArcRotateCamera />
  <Skybox rootUrl="/assets/textures/skybox/sky" />
</Canvas>
