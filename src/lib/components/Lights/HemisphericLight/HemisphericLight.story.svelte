<script lang="ts" context="module">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import LightGizmo from '$lib/components/Gizmos/LightGizmo/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import Box from '$lib/components/Objects/Box/index.svelte'
  import Ground from '$lib/components/Objects/Ground/index.svelte'
  import { Color3 } from '@babylonjs/core/Maths/math.color'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { PageMeta } from '@vitebook/client'
  import { ControlsAddon } from '@vitebook/client/addons'

  export const __pageMeta: PageMeta = {
    title: 'HemisphericLight',
    description: '',
  }
</script>

<script lang="ts">
  let intensity = 0.5
  let showGizmo = false
  let diffuseHex = '#ffffff'
  let specularHex = '#ffffff'

  // scene specific
  const objectPosition = new Vector3(0, 3, 0)

  $: specular = Color3.FromHexString(specularHex)
  $: diffuse = Color3.FromHexString(diffuseHex)
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <HemisphericLight {intensity} {specular} {diffuse}>
    {#if showGizmo}
      <LightGizmo />
    {/if}
  </HemisphericLight>
  <ArcRotateCamera target={objectPosition} />
  <Box y={3} />
  <Ground options={{ width: 6, height: 6, subdivisions: 2 }} y={1} />
</Canvas>

<ControlsAddon>
  <label style="margin-top: 24px;display:block;">
    intensity <input type="range" bind:value={intensity} step=".01" max="1" min="0" />
  </label>
  <label style="margin-top: 24px;display:block;">
    show gizmo <input type="checkbox" bind:checked={showGizmo} />
  </label>
  <fieldset>
    <legend>Colors</legend>
    <label style="margin-top: 24px;display:block;">
      diffuse <input type="color" bind:value={diffuseHex} />
    </label>
    <label style="margin-top: 24px;display:block;">
      specular <input type="color" bind:value={specularHex} />
    </label>
  </fieldset>
</ControlsAddon>
