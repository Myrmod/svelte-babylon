<script lang="ts" context="module">
  import {
    ArcRotateCamera,
    Box,
    Button,
    Canvas,
    DirectionalLight,
    Ground,
    GUI,
    HemisphericLight,
  } from '$lib'
  import type { PageMeta } from '@vitebook/client'
  import * as BABYLON from 'babylonjs'

  export const __pageMeta: PageMeta = {
    title: 'Button',
    description: '',
  }
</script>

<script lang="ts">
  // Functionality
  function handleClick() {
    console.log('clicked button')
  }

  // Scene
  const objectPosition = new BABYLON.Vector3(0, 3, 0)

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
  <HemisphericLight intensity={0.5} />
  <DirectionalLight
    intensity={0.25}
    direction={new BABYLON.Vector3(-10, -20, -10)}
    position={new BABYLON.Vector3(2, 6, 2)}
    castShadowOf={shadowObjects}
  />
  <ArcRotateCamera target={objectPosition} />
  <Box y={3} bind:object />
  <Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
  <GUI>
    <Button onPointerClick={handleClick} />
  </GUI>
</Canvas>
