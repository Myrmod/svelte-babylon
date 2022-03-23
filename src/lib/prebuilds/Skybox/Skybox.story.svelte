<script lang="ts" context="module">
  import type { PageMeta } from '@vitebook/client'
  import { ArcRotateCamera, Canvas, HemisphericLight, Skybox } from 'svelte-babylon'

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
