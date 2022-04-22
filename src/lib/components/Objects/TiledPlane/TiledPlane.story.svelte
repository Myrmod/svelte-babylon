<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import StandardMaterial from '$lib/components/Materials/StandardMaterial/index.svelte'
  import TiledPlane from '$lib/components/Objects/TiledPlane/index.svelte'
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
  <HemisphericLight />
  <ArcRotateCamera alpha={1.8} radius={3} />
  <TiledPlane
    bind:object
    options={{
      sideOrientation: Mesh.DOUBLESIDE,
      pattern: Mesh.NO_FLIP,
      width: 2,
      height: 2,
      tileSize: 0.5,
      tileWidth: 0.5,
    }}
  >
    <StandardMaterial />
  </TiledPlane>
</Canvas>
