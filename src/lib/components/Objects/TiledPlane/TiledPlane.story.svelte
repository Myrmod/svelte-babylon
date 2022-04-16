<script lang="ts" context="module">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import StandardMaterial from '$lib/components/Materials/StandardMaterial/index.svelte'
  import TiledPlane from '$lib/components/Objects/TiledPlane/index.svelte'
  import StandardTexture from '$lib/components/Textures/StandardTexture/index.svelte'
  import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
  import { Mesh } from '@babylonjs/core/Meshes/mesh'
  import type { PageMeta } from '@vitebook/client'

  export const __pageMeta: PageMeta = {
    title: 'TiledPlane',
    description: 'https://doc.babylonjs.com/divingDeeper/mesh/creation/set/tiled_plane',
  }
</script>

<script lang="ts">
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
    <StandardMaterial>
      <StandardTexture
        url="/assets/textures/metal/metal_diffuse.jpg"
        uScale={2}
        vScale={2}
        textureTarget="diffuseTexture"
      />
      <StandardTexture
        url="/assets/textures/metal/metal_specular.jpg"
        uScale={2}
        vScale={2}
        textureTarget="specularTexture"
      />
      <StandardTexture
        url="/assets/textures/metal/metal_ao.jpg"
        uScale={2}
        vScale={2}
        textureTarget="ambientTexture"
      />
      <StandardTexture
        url="/assets/textures/metal/metal_normal.jpg"
        uScale={2}
        vScale={2}
        textureTarget="bumpTexture"
      />
    </StandardMaterial>
  </TiledPlane>
</Canvas>
