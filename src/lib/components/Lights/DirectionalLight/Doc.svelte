<script lang="ts">
  import type RootContext from '$lib/types'

  import * as BABYLON from 'babylonjs'
  import {
    Canvas,
    ArcRotateCamera,
    DirectionalLight,
    Box,
    Ground,
    LightGizmo,
  } from 'svelte-babylon'

  let root: RootContext
  const objectPosition = new BABYLON.Vector3(0, 3, 0)

  let box: {
    self: BABYLON.Mesh | BABYLON.AbstractMesh
  }

  let shadowObjects: Array<typeof box['self']>
  $: {
    const temp: typeof shadowObjects = []
    if (box?.self) {
      temp.push(box.self)
    }
    shadowObjects = temp
  }
</script>

<h1>ShadowGenerator</h1>

<div class="canvas">
  <Canvas
    antialiasing
    engineOptions={{
      preserveDrawingBuffer: true,
      stencil: true,
    }}
    bind:root
  >
    <DirectionalLight
      direction={new BABYLON.Vector3(-10, -20, -10)}
      castShadowOf={shadowObjects}
      intensity={0.5}
      position={new BABYLON.Vector3(2, 6, 2)}
    >
      <LightGizmo />
    </DirectionalLight>
    <ArcRotateCamera target={objectPosition} />
    <Box receiveShadows bind:object={box} y={2} />
    <Ground options={{ width: 6, height: 6, subdivisions: 2, updatable: false }} receiveShadows />
  </Canvas>
</div>
