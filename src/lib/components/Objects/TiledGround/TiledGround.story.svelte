<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import StandardMaterial from '$lib/components/Materials/StandardMaterial/index.svelte'
  import TiledGround from '$lib/components/Objects/TiledGround/index.svelte'
  import { Color3 } from '@babylonjs/core/Maths/math.color'
  import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'

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
  <HemisphericLight />
  <ArcRotateCamera alpha={1.8} radius={3} />
  <TiledGround
    bind:object
    options={{
      xmin: 1,
      zmin: 1,
      xmax: 1,
      zmax: 1,
    }}
  >
    <StandardMaterial diffuseColor={Color3.Red()} />
  </TiledGround>
</Canvas>
