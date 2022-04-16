<script lang="ts" context="module">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import LineSystem from '$lib/components/Objects/LineSystem/index.svelte'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { PageMeta } from '@vitebook/client'

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
