<script lang="ts" context="module">
  import { ArcRotateCamera, Canvas, DirectionalLight, HemisphericLight, Polygon } from '$lib'
  import type { PageMeta } from '@vitebook/client'
  import * as BABYLON from 'babylonjs'

  export const __pageMeta: PageMeta = {
    title: 'Polygon',
    description: 'https://doc.babylonjs.com/divingDeeper/mesh/creation/param/polyMeshBuilder',
  }
</script>

<script lang="ts">
  const objectPosition = new BABYLON.Vector3(0, 3, 0)

  let object: {
    self: BABYLON.Mesh | BABYLON.AbstractMesh
  }

  let shadowObjects: Array<typeof object['self']>
  $: {
    const temp: typeof shadowObjects = []
    if (object?.self) {
      temp.push(object.self)
    }
    shadowObjects = temp
  }
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <HemisphericLight intensity={0.5} />
  <DirectionalLight
    intensity={0.25}
    direction={new BABYLON.Vector3(-10, -20, -10)}
    position={new BABYLON.Vector3(2, 6, 2)}
    castShadowOf={shadowObjects}
  />
  <ArcRotateCamera target={objectPosition} radius={10} />
  <Polygon
    y={1}
    bind:object
    options={{
      shape: [
        new BABYLON.Vector3(2, 0, -2),
        new BABYLON.Vector3(2, 0, 0),
        new BABYLON.Vector3(3, 0, 2),
        new BABYLON.Vector3(1, 0, 2),
        new BABYLON.Vector3(-3, 0, 3),
        new BABYLON.Vector3(-3, 0, 1),
        new BABYLON.Vector3(-2, 0, -2),
        new BABYLON.Vector3(-2, 0, -3),
        new BABYLON.Vector3(2, 0, -3),
      ],
      holes: [
        [
          new BABYLON.Vector3(1, 0, -1),
          new BABYLON.Vector3(1.5, 0, 0),
          new BABYLON.Vector3(1.4, 0, 1),
          new BABYLON.Vector3(0.5, 0, 1.5),
        ],
      ],
      depth: 2,
    }}
  />
</Canvas>
