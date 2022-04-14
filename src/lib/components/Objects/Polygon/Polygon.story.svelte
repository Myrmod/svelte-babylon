<script lang="ts" context="module">
  import { AbstractMesh, Mesh, Vector3 } from '@babylonjs/core'
  import type { PageMeta } from '@vitebook/client'
  import {
    ArcRotateCamera,
    Canvas,
    DirectionalLight,
    HemisphericLight,
    Polygon,
  } from 'svelte-babylon'

  export const __pageMeta: PageMeta = {
    title: 'Polygon',
    description: 'https://doc.babylonjs.com/divingDeeper/mesh/creation/param/polyMeshBuilder',
  }
</script>

<script lang="ts">
  const objectPosition = new Vector3(0, 3, 0)

  let object: {
    self: Mesh | AbstractMesh
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
    direction={new Vector3(-10, -20, -10)}
    position={new Vector3(2, 6, 2)}
    castShadowOf={shadowObjects}
  />
  <ArcRotateCamera target={objectPosition} radius={10} />
  <Polygon
    y={1}
    bind:object
    options={{
      shape: [
        new Vector3(2, 0, -2),
        new Vector3(2, 0, 0),
        new Vector3(3, 0, 2),
        new Vector3(1, 0, 2),
        new Vector3(-3, 0, 3),
        new Vector3(-3, 0, 1),
        new Vector3(-2, 0, -2),
        new Vector3(-2, 0, -3),
        new Vector3(2, 0, -3),
      ],
      holes: [
        [
          new Vector3(1, 0, -1),
          new Vector3(1.5, 0, 0),
          new Vector3(1.4, 0, 1),
          new Vector3(0.5, 0, 1.5),
        ],
      ],
      depth: 2,
    }}
  />
</Canvas>
