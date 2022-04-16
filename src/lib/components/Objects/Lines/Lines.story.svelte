<script lang="ts" context="module">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import Lines from '$lib/components/Objects/Lines/index.svelte'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { PageMeta } from '@vitebook/client'

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
