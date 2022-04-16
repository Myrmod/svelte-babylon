<script lang="ts" context="module">
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
  import { Mesh } from '@babylonjs/core/Meshes/mesh'
  import type { PageMeta } from '@vitebook/client'
  import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
  import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
  import Ribbon from 'svelte-babylon/components/Objects/Ribbon/index.svelte'

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
