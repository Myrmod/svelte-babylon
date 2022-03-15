<script lang="ts" context="module">
  import { ArcRotateCamera, Canvas, HemisphericLight, LineSystem } from '$lib'
  import type { PageMeta } from '@vitebook/client'
  import * as BABYLON from 'babylonjs'

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
  <ArcRotateCamera target={new BABYLON.Vector3(5, 3, 3)} alpha={Math.PI / 4} radius={20} />
  <LineSystem
    options={{
      lines: [
        [new BABYLON.Vector3(0, 0, 10), new BABYLON.Vector3(10, 0, 10)],
        [
          new BABYLON.Vector3(10, 0, 0),
          new BABYLON.Vector3(10, 10, 0),
          new BABYLON.Vector3(0, 10, 0),
        ],
      ],
    }}
  />
</Canvas>
