<script lang="ts" context="module">
  import {
    ArcRotateCamera,
    Canvas,
    HemisphericLight,
    StandardMaterial,
    StandardTexture,
    TiledBox,
  } from '$lib'
  import { TextureTargets } from '$lib/types/enums/TextureTargets'
  import type { PageMeta } from '@vitebook/client'
  import * as BABYLON from 'babylonjs'

  export const __pageMeta: PageMeta = {
    title: 'TiledBox',
    description: 'https://doc.babylonjs.com/divingDeeper/mesh/creation/set/tiled_box',
  }
</script>

<script lang="ts">
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
  <HemisphericLight />
  <ArcRotateCamera alpha={1.8} radius={3} />
  <TiledBox
    bind:object
    options={{
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
      pattern: BABYLON.Mesh.NO_FLIP,
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
        textureTarget={TextureTargets.DIFFUSE}
      />
      <StandardTexture
        url="/assets/textures/metal/metal_specular.jpg"
        uScale={2}
        vScale={2}
        textureTarget={TextureTargets.SPECULAR}
      />
      <StandardTexture
        url="/assets/textures/metal/metal_ao.jpg"
        uScale={2}
        vScale={2}
        textureTarget={TextureTargets.AMBIENT}
      />
      <StandardTexture
        url="/assets/textures/metal/metal_normal.jpg"
        uScale={2}
        vScale={2}
        textureTarget={TextureTargets.BUMP}
      />
    </StandardMaterial>
  </TiledBox>
</Canvas>
