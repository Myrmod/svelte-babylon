<script lang="ts" context="module">
  import type { PageMeta } from '@vitebook/client'
  import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
  import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
  import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
  import PhotoDome from 'svelte-babylon/components/Objects/PhotoDome/index.svelte'

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
