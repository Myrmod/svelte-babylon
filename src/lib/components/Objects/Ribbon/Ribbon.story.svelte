<script lang="ts" context="module">
  import { AbstractMesh, Mesh, Vector3 } from '@babylonjs/core'
  import type { PageMeta } from '@vitebook/client'
  import {
    ArcRotateCamera,
    Canvas,
    DirectionalLight,
    HemisphericLight,
    Ribbon,
  } from 'svelte-babylon'

  export const __pageMeta: PageMeta = {
    title: 'Ribbon',
    description: 'https://doc.babylonjs.com/divingDeeper/mesh/creation/param/ribbon',
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
  <ArcRotateCamera target={objectPosition} radius={20} alpha={Math.PI / 4} />
  <Ribbon
    bind:object
    options={{
      pathArray: [
        [
          new Vector3(5, 0, 0),
          new Vector3(4.5, 1, 0),
          new Vector3(4, 2, 0),
          new Vector3(3.5, 3, 0),
          new Vector3(3, 4, 0),
        ],
        [
          new Vector3(0, 0, -5),
          new Vector3(0, 0.5, -7),
          new Vector3(0, 1, -9),
          new Vector3(0, 1.5, -11),
          new Vector3(0, 2, -13),
        ],
        [
          new Vector3(-5, 0, 0),
          new Vector3(-4.5, 1, 0),
          new Vector3(-4.0, 2, 0),
          new Vector3(-3.5, 3, 0),
          new Vector3(-3, 4, 0),
        ],
      ],
      sideOrientation: Mesh.DOUBLESIDE,
    }}
  />
</Canvas>
