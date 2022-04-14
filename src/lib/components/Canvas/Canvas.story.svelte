<script lang="ts" context="module">
  import { Vector3 } from '@babylonjs/core'
  import type { PageMeta } from '@vitebook/client'
  import { ControlsAddon } from '@vitebook/client/addons'
  import { ArcRotateCamera, Box, Canvas, DirectionalLight, HemisphericLight } from 'svelte-babylon'

  export const __pageMeta: PageMeta = {
    title: 'Canvas',
    description: `That's the root of your scene, where all the other elements are placed into. It is basically an implementation of https://doc.babylonjs.com/divingDeeper/scene`,
  }
</script>

<script lang="ts">
  let antialiasing = false
  let backgroundColor = '#454545'
  let preserveDrawingBuffer = true
  let stencil = true

  $: clearColor = BABYLON.Color4.FromHexString(backgroundColor)
</script>

<Canvas
  {antialiasing}
  engineOptions={{
    preserveDrawingBuffer,
    stencil,
  }}
  {clearColor}
>
  <HemisphericLight intensity={0.25} />
  <DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
  <ArcRotateCamera />
  <Box />
</Canvas>

<ControlsAddon>
  <label style="margin-top: 24px;display:block;">
    Antialiasing <input type="checkbox" bind:checked={antialiasing} />
  </label>
  <label style="margin-top: 24px;display:block;">
    preserveDrawingBuffer <input type="checkbox" bind:checked={preserveDrawingBuffer} />
  </label>
  <label style="margin-top: 24px;display:block;">
    stencil <input type="checkbox" bind:checked={stencil} />
  </label>
  <label style="margin-top: 24px;display:block;">
    clearColor <input type="color" bind:value={backgroundColor} />
  </label>
</ControlsAddon>
