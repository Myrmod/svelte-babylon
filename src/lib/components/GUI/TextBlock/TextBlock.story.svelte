<script lang="ts" context="module">
  import {
    ArcRotateCamera,
    Box,
    Canvas,
    DirectionalLight,
    Ground,
    GUI,
    HemisphericLight,
    TextBlock,
  } from '$lib'
  import type { PageMeta } from '@vitebook/client'
  import { ControlsAddon } from '@vitebook/client/addons'
  import * as BABYLON from 'babylonjs'

  export const __pageMeta: PageMeta = {
    title: 'TextBlock',
    description: '',
  }
</script>

<script lang="ts">
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

  let text = 'Hello Svelte-Babylon'
  let color = '#ffffff'
  let fontSize = 24
  let fontFamily = 'Arial'
  let fontStyle = 'normal'
  let fontWeight = '600'
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
    <TextBlock {text} {color} {fontSize} {fontFamily} {fontStyle} {fontWeight} />
  </GUI>
</Canvas>

<ControlsAddon>
  <label style="margin-top: 24px;display:block;">
    text <input type="text" bind:value={text} />
  </label>
  <label style="margin-top: 24px;display:block;">
    color <input type="color" bind:value={color} />
  </label>
  <fieldset style="margin-top: 24px;display:block;">
    <legend>Font</legend>
    <label style="margin-top: 24px;display:block;">
      fontSize <input type="text" bind:value={fontSize} />
    </label>
    <label style="margin-top: 24px;display:block;">
      fontFamily <input type="text" bind:value={fontFamily} />
    </label>
    <label style="margin-top: 24px;display:block;">
      fontStyle <input type="text" bind:value={fontStyle} />
    </label>
    <label style="margin-top: 24px;display:block;">
      fontWeight <input type="text" bind:value={fontWeight} />
    </label>
  </fieldset>
</ControlsAddon>
