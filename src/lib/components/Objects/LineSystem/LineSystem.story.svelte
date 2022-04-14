<script lang="ts" context="module">
  import { Vector3 } from '@babylonjs/core'
  import type { PageMeta } from '@vitebook/client'
  import { ArcRotateCamera, Canvas, HemisphericLight, LineSystem } from 'svelte-babylon'

  export const __pageMeta: PageMeta = {
    title: 'LineSystem',
    description: 'https://doc.babylonjs.com/divingDeeper/mesh/creation/param/line_system',
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
  <ArcRotateCamera target={new Vector3(5, 3, 3)} alpha={Math.PI / 4} radius={20} />
  <LineSystem
    options={{
      lines: [
        [new Vector3(0, 0, 10), new Vector3(10, 0, 10)],
        [new Vector3(10, 0, 0), new Vector3(10, 10, 0), new Vector3(0, 10, 0)],
      ],
    }}
  />
</Canvas>
