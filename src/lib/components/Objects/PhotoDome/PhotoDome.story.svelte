<script lang="ts" context="module">
  import { ArcRotateCamera, PhotoDome, Canvas, Box, HemisphericLight } from '$lib'
  import type { PageMeta } from '@vitebook/client'

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
