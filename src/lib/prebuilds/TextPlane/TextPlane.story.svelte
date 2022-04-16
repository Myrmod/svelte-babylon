<script lang="ts" context="module">
  import type { PageMeta } from '@vitebook/client'
  import { ControlsAddon } from '@vitebook/client/addons'
  import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
  import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
  import TextPlane from 'svelte-babylon/prebuilds/TextPlane/index.svelte'

  export const __pageMeta: PageMeta = {
    title: 'TextPlane',
    description: '',
  }
</script>

<script lang="ts">
  let text = 'Text Plane'
  let width = 16 / 5.2
  let height = 9 / 5.2
  let backgroundColor = '#ffffff'
  let color = '#000000'
  let fontSizeMultiplier = 1
  let sizeMultiplier = 60
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <HemisphericLight />
  <ArcRotateCamera radius={5} beta={1} />
  <TextPlane
    {text}
    planeOptions={{ width, height }}
    {backgroundColor}
    {color}
    {fontSizeMultiplier}
    {sizeMultiplier}
  />
</Canvas>

<ControlsAddon>
  <label style="margin-top: 24px;display:block;">
    text <input type="text" bind:value={text} />
  </label>
  <label style="margin-top: 24px;display:block;">
    color <input type="color" bind:value={color} />
  </label>
  <label style="margin-top: 24px;display:block;">
    backgroundColor <input type="color" bind:value={backgroundColor} />
  </label>
  <label style="margin-top: 24px;display:block;">
    width <input type="range" min="1" max="10" step="0.01" bind:value={width} />
  </label>
  <label style="margin-top: 24px;display:block;">
    height <input type="range" min="1" max="10" step="0.01" bind:value={height} />
  </label>
  <label style="margin-top: 24px;display:block;">
    sizeMultiplier <input
      type="range"
      min="0.01"
      max="600"
      step="0.01"
      bind:value={sizeMultiplier}
    />
  </label>
  <label style="margin-top: 24px;display:block;">
    fontSizeMultiplier <input
      type="range"
      min="1"
      max="10"
      step="0.01"
      bind:value={fontSizeMultiplier}
    />
  </label>
</ControlsAddon>
