<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import StandardMaterial from '$lib/components/Materials/StandardMaterial/index.svelte'
  import TiledBox from '$lib/components/Objects/TiledBox/index.svelte'
  import Scene from '$lib/components/Scene/index.svelte'
  import StandardTexture from '$lib/components/Textures/StandardTexture/index.svelte'
  import { Color3 } from '@babylonjs/core/Maths/math.color.js'
  import { Mesh } from '@babylonjs/core/Meshes/mesh.js'
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <Scene clearColor={Color3.Gray()}>
    <HemisphericLight />
    <ArcRotateCamera alpha={1.8} radius={3} />
    <TiledBox
      options={{
        sideOrientation: Mesh.DOUBLESIDE,
        pattern: Mesh.NO_FLIP,
        width: 1,
        height: 1,
        tileSize: 0.5,
        tileWidth: 0.5,
      }}
    >
      <StandardMaterial>
        <StandardTexture url="/svelte-babylon-icon.png" textureTarget="diffuseTexture" />
        <StandardTexture url="/svelte-babylon-icon.png" textureTarget="specularTexture" />
      </StandardMaterial>
    </TiledBox>
  </Scene>
</Canvas>
