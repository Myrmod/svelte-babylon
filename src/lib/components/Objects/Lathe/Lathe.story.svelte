<script lang="ts" context="module">
  import { AbstractMesh, Mesh, Vector3 } from '@babylonjs/core'
  import type { PageMeta } from '@vitebook/client'
  import {
    ArcRotateCamera,
    Canvas,
    DirectionalLight,
    Ground,
    HemisphericLight,
    Lathe,
  } from 'svelte-babylon'

  export const __pageMeta: PageMeta = {
    title: 'Lathe',
    description: 'https://doc.babylonjs.com/divingDeeper/mesh/creation/param/lathe',
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
  <ArcRotateCamera target={objectPosition} />
  <Lathe
    y={3}
    bind:object
    options={{
      shape: [
        new Vector3(2, 0, 0),
        new Vector3(4, 0, 0),
        new Vector3(4, 1, 0),
        new Vector3(2, 1, 0),
      ],
      radius: 0.5,
      tessellation: 6,
      sideOrientation: Mesh.DOUBLESIDE,
    }}
  />
  <Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
</Canvas>
