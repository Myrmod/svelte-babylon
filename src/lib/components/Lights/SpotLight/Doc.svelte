<script lang="ts">
  import * as BABYLON from 'babylonjs'
  import {
    Canvas,
    ArcRotateCamera,
    SpotLight,
    Box,
    Ground,
    StandardMaterial,
    LightGizmo,
  } from 'svelte-babylon'

  const objectPosition = new BABYLON.Vector3(0, 2, 0)
  let root
  let shadowCastingObjects = []
  $: if (root?.objects) {
    console.log('here', root.objects, Object.values(root.objects).length)

    shadowCastingObjects = Object.values(root?.objects).map(({ self }) => self)
  }

  $: if (root?.objects) console.log(Object.entries(root?.objects))
</script>

<h1>SpotLight</h1>

<div class="canvas">
  <Canvas
    antialiasing
    engineOptions={{
      preserveDrawingBuffer: true,
      stencil: true,
    }}
    bind:root
  >
    <ArcRotateCamera target={objectPosition} />
    {#if shadowCastingObjects.length}
      <SpotLight
        {shadowCastingObjects}
        position={new BABYLON.Vector3(0, 4, 2)}
        direction={new BABYLON.Vector3(0, -1, -0.5)}
      >
        <LightGizmo />
      </SpotLight>
    {/if}
    <Box position={objectPosition} receiveShadows>
      <StandardMaterial diffuseColor={new BABYLON.Color3(1)} />
    </Box>

    <Ground options={{ width: 6, height: 6, subdivisions: 2, updatable: false }} receiveShadows>
      <StandardMaterial diffuseColor={BABYLON.Color3.Teal()} />
    </Ground>
  </Canvas>
</div>
