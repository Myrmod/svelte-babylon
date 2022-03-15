<script lang="ts" context="module">
  import { ArcRotateCamera, Canvas, HemisphericLight, Lines } from '$lib'
  import type { PageMeta } from '@vitebook/client'
  import * as BABYLON from 'babylonjs'

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
        new BABYLON.Vector3(-2, -1, 0),
        new BABYLON.Vector3(0, 1, 0),
        new BABYLON.Vector3(2, -1, 0),
        new BABYLON.Vector3(3, 2, 0),
      ],
    }}
  />
</Canvas>
