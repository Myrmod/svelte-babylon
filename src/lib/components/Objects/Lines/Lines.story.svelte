<script lang="ts" context="module">
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { PageMeta } from '@vitebook/client'
  import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
  import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
  import Lines from 'svelte-babylon/components/Objects/Lines/index.svelte'

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
