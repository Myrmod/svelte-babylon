<script lang="ts" context="module">
  import type { PageMeta } from '@vitebook/client'
  import { ControlsAddon } from '@vitebook/client/addons'
  import * as BABYLON from 'babylonjs'
  import {
    ArcRotateCamera,
    Box,
    Button,
    Canvas,
    DirectionalLight,
    Ground,
    GUI,
    HemisphericLight,
  } from 'svelte-babylon'

  export const __pageMeta: PageMeta = {
    title: 'Button',
    description: '',
  }
</script>

<script lang="ts">
  // Functionality
  function handleClick() {
    alert('clicked button')
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

  let width = '150px'
  let height = '40px'
  let color = '#ffffff'
  let cornerRadius = 20
  let background = '#aaaa00'
  let text = 'Click Me'
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
    <Button onPointerUp={handleClick} {width} {height} {color} {cornerRadius} {background} {text} />
  </GUI>
</Canvas>

<ControlsAddon>
  <label style="margin-top: 24px;display:block;">
    text <input type="text" bind:value={text} />
  </label>
  <label style="margin-top: 24px;display:block;">
    color <input type="color" bind:value={color} />
  </label>
  <label style="margin-top: 24px;display:block;">
    background <input type="color" bind:value={background} />
  </label>
  <label style="margin-top: 24px;display:block;">
    width <input type="string" bind:value={width} />
  </label>
  <label style="margin-top: 24px;display:block;">
    height <input type="string" bind:value={height} />
  </label>
  <label style="margin-top: 24px;display:block;">
    cornerRadius <input type="number" bind:value={cornerRadius} />
  </label>
</ControlsAddon>
