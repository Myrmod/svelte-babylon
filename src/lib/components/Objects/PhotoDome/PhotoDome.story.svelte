<script lang="ts" context="module">
  import type { PageMeta } from '@vitebook/client'
  import { ArcRotateCamera, Box, Canvas, HemisphericLight, PhotoDome } from 'svelte-babylon'

  export const __pageMeta: PageMeta = {
    title: 'PhotoDome',
    description: '',
  }
</script>

<script lang="ts">
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <HemisphericLight />
  <ArcRotateCamera radius={10} beta={-1} />
  <Box />
  <PhotoDome url="/assets/images/photosphere.jpg" />
</Canvas>
