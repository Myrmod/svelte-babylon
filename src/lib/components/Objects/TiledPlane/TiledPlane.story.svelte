<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import StandardMaterial from '$lib/components/Materials/StandardMaterial/index.svelte'
  import TiledPlane from '$lib/components/Objects/TiledPlane/index.svelte'
  import StandardTexture from '$lib/components/Textures/StandardTexture/index.svelte'
  import { Mesh } from '@babylonjs/core/Meshes/mesh.js'
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
    options={{
      sideOrientation: Mesh.DOUBLESIDE,
      pattern: Mesh.NO_FLIP,
      width: 2,
      height: 2,
      tileSize: 1,
      tileWidth: 1,
    }}
  >
    <StandardMaterial>
      <StandardTexture url="/svelte-babylon-icon.png" textureTarget="diffuseTexture" />
      <StandardTexture url="/svelte-babylon-icon.png" textureTarget="specularTexture" />
    </StandardMaterial>
  </TiledPlane>
</Canvas>
