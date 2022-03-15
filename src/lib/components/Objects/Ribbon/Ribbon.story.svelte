<script lang="ts" context="module">
  import { ArcRotateCamera, Canvas, DirectionalLight, HemisphericLight, Ribbon } from '$lib'
  import type { PageMeta } from '@vitebook/client'
  import * as BABYLON from 'babylonjs'

  export const __pageMeta: PageMeta = {
    title: 'Ribbon',
    description: 'https://doc.babylonjs.com/divingDeeper/mesh/creation/param/ribbon',
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
  <ArcRotateCamera target={objectPosition} radius={20} alpha={Math.PI / 4} />
  <Ribbon
    bind:object
    options={{
      pathArray: [
        [
          new BABYLON.Vector3(5, 0, 0),
          new BABYLON.Vector3(4.5, 1, 0),
          new BABYLON.Vector3(4, 2, 0),
          new BABYLON.Vector3(3.5, 3, 0),
          new BABYLON.Vector3(3, 4, 0),
        ],
        [
          new BABYLON.Vector3(0, 0, -5),
          new BABYLON.Vector3(0, 0.5, -7),
          new BABYLON.Vector3(0, 1, -9),
          new BABYLON.Vector3(0, 1.5, -11),
          new BABYLON.Vector3(0, 2, -13),
        ],
        [
          new BABYLON.Vector3(-5, 0, 0),
          new BABYLON.Vector3(-4.5, 1, 0),
          new BABYLON.Vector3(-4.0, 2, 0),
          new BABYLON.Vector3(-3.5, 3, 0),
          new BABYLON.Vector3(-3, 4, 0),
        ],
      ],
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    }}
  />
</Canvas>
