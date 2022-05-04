<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import Ribbon from '$lib/components/Objects/Ribbon/index.svelte'
  import Scene from '$lib/components/Scene/index.svelte'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
  import { Mesh } from '@babylonjs/core/Meshes/mesh.js'

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
  <Scene>
    <HemisphericLight intensity={0.5} />
    <DirectionalLight
      intensity={0.25}
      direction={new Vector3(-10, -20, -10)}
      position={new Vector3(2, 6, 2)}
      castShadowOf={shadowObjects}
    />
    <ArcRotateCamera target={new Vector3(0, 3, 0)} radius={20} alpha={Math.PI / 4} />
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
  </Scene>
</Canvas>
