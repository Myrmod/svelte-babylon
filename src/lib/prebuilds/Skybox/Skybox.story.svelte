<script lang="ts" context="module">
  import { ArcRotateCamera, Canvas, HemisphericLight, Skybox } from '$lib'
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
