<script lang="ts" context="module">
  import { ArcRotateCamera, Box, Canvas, DirectionalLight, Ground, LightGizmo } from '$lib'
  import type { PageMeta } from '@vitebook/client'
  import { ControlsAddon } from '@vitebook/client/addons'
  import * as BABYLON from 'babylonjs'

  export const __pageMeta: PageMeta = {
    title: 'DirectionalLight',
    description: '',
  }
</script>

<script lang="ts">
  let intensity = 0.5
  let showGizmo = false
  let diffuseHex = '#ffffff'
  let specularHex = '#ffffff'

  // scene specific
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

  $: specular = BABYLON.Color3.FromHexString(specularHex)
  $: diffuse = BABYLON.Color3.FromHexString(diffuseHex)
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <DirectionalLight
    {intensity}
    direction={new BABYLON.Vector3(-10, -20, -10)}
    position={new BABYLON.Vector3(2, 6, 2)}
    castShadowOf={shadowObjects}
    {specular}
    {diffuse}
  >
    {#if showGizmo}
      <LightGizmo />
    {/if}
  </DirectionalLight>
  <ArcRotateCamera target={objectPosition} />
  <Box y={3} bind:object={box} />
  <Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
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
