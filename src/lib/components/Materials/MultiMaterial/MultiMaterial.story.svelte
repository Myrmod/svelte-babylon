<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import MultiMaterial from '$lib/components/Materials/MultiMaterial/index.svelte'
  import StandardMaterial from '$lib/components/Materials/StandardMaterial/index.svelte'
  import TiledGround from '$lib/components/Objects/TiledGround/index.svelte'
  import Scene from '$lib/components/Scene/index.svelte'
  import { Color3 } from '@babylonjs/core/Maths/math.color'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'

  const gridOptions = {
    h: 8,
    w: 8,
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
    <HemisphericLight intensity={0.25} />
    <DirectionalLight
      intensity={0.5}
      direction={new Vector3(-10, -20, -10)}
      position={new Vector3(2, 6, 2)}
    />
    <ArcRotateCamera target={Vector3.Zero()} radius={5} beta={1} />
    <TiledGround
      options={{
        xmin: -3,
        zmin: -3,
        xmax: 3,
        zmax: 3,
        subdivisions: gridOptions,
      }}
    >
      <MultiMaterial renderAs="chessboard" options={{ grid: gridOptions }}>
        <StandardMaterial diffuseColor={Color3.White()} />
        <StandardMaterial diffuseColor={Color3.Black()} />
      </MultiMaterial>
    </TiledGround>
  </Scene>
</Canvas>
