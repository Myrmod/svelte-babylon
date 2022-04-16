<script lang="ts" context="module">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import StandardMaterial from '$lib/components/Materials/StandardMaterial/index.svelte'
  import Plane from '$lib/components/Objects/Plane/index.svelte'
  import { Color3 } from '@babylonjs/core/Maths/math.color'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { PageMeta } from '@vitebook/client'
  import { ControlsAddon } from '@vitebook/client/addons'

  export const __pageMeta: PageMeta = {
    title: 'StandardMaterial',
    description: '',
  }
</script>

<script lang="ts">
  let ambientHex = '#000000'
  let diffuseHex = '#333333'
  let emissiveHex = '#333333'
  let specularHex = '#ffffff'
  let roughness = 1
  let separateCullingPass = false
  let invertNormalMapX = false
  let invertNormalMapY = false
  let invertRefractionY = false
  let backfaceCulling = false

  $: ambient = Color3.FromHexString(ambientHex)
  $: diffuse = Color3.FromHexString(diffuseHex)
  $: emissive = Color3.FromHexString(emissiveHex)
  $: specular = Color3.FromHexString(specularHex)
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <HemisphericLight intensity={0.25} />
  <DirectionalLight
    intensity={0.5}
    direction={new Vector3(-10, -20, -10)}
    position={new Vector3(2, 6, 2)}
  />
  <ArcRotateCamera target={Vector3.Zero()} />
  <Plane>
    <StandardMaterial
      ambientColor={ambient}
      diffuseColor={diffuse}
      emissiveColor={emissive}
      specularColor={specular}
      {roughness}
      {separateCullingPass}
      {invertNormalMapX}
      {invertNormalMapY}
      {invertRefractionY}
      {backfaceCulling}
    />
  </Plane>
</Canvas>

<ControlsAddon>
  <label style="margin-top: 24px;display:block;">
    roughness <input type="range" bind:value={roughness} step=".01" max="1" min="0" />
  </label>
  <label style="margin-top: 24px;display:block;">
    separateCullingPass <input type="checkbox" bind:checked={separateCullingPass} />
  </label>
  <label style="margin-top: 24px;display:block;">
    invertNormalMapX <input type="checkbox" bind:checked={invertNormalMapX} />
  </label>
  <label style="margin-top: 24px;display:block;">
    invertNormalMapY <input type="checkbox" bind:checked={invertNormalMapY} />
  </label>
  <label style="margin-top: 24px;display:block;">
    invertRefractionY <input type="checkbox" bind:checked={invertRefractionY} />
  </label>
  <label style="margin-top: 24px;display:block;">
    backfaceCulling <input type="checkbox" bind:checked={backfaceCulling} />
  </label>
  <fieldset>
    <legend>Colors</legend>
    <label style="margin-top: 24px;display:block;">
      ambient <input type="color" bind:value={ambientHex} />
    </label>
    <label style="margin-top: 24px;display:block;">
      emissive <input type="color" bind:value={emissiveHex} />
    </label>
    <label style="margin-top: 24px;display:block;">
      diffuse <input type="color" bind:value={diffuseHex} />
    </label>
    <label style="margin-top: 24px;display:block;">
      specular <input type="color" bind:value={specularHex} />
    </label>
  </fieldset>
</ControlsAddon>
