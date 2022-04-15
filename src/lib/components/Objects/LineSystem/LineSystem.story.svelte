<script lang="ts" context="module">
  import { Vector3 } from '@babylonjs/core'
  import type { PageMeta } from '@vitebook/client'
  import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
  import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
  import LineSystem from 'svelte-babylon/components/Objects/LineSystem/index.svelte'

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
