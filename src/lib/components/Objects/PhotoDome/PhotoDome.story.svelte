<script lang="ts" context="module">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import Box from '$lib/components/Objects/Box/index.svelte'
  import PhotoDome from '$lib/components/Objects/PhotoDome/index.svelte'
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
