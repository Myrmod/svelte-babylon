<script lang="ts" context="module">
  import { Vector3 } from '@babylonjs/core'
  import type { PageMeta } from '@vitebook/client'
  import { ArcRotateCamera, Canvas, HemisphericLight, Lines } from 'svelte-babylon'
  export const __pageMeta: PageMeta = {
    title: 'Lines',
    description: 'https://doc.babylonjs.com/divingDeeper/mesh/creation/param/lines',
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
  <ArcRotateCamera radius={5} />
  <Lines
    options={{
      points: [
        new Vector3(-2, -1, 0),
        new Vector3(0, 1, 0),
        new Vector3(2, -1, 0),
        new Vector3(3, 2, 0),
      ],
    }}
  />
</Canvas>
