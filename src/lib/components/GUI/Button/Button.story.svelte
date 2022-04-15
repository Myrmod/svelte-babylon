<script lang="ts" context="module">
  import { AbstractMesh, Mesh, Vector3 } from '@babylonjs/core'
  import type { PageMeta } from '@vitebook/client'
  import { ControlsAddon } from '@vitebook/client/addons'
  import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
  import Button from 'svelte-babylon/components/GUI/Button/index.svelte'
  import GUI from 'svelte-babylon/components/GUI/index.svelte'
  import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
  import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
  import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'

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
  const objectPosition = new Vector3(0, 3, 0)

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
    direction={new Vector3(-10, -20, -10)}
    position={new Vector3(2, 6, 2)}
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
