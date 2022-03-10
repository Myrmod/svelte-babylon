<script lang="ts" context="module">
  import {
    ArcRotateCamera,
    Canvas,
    DirectionalLight,
    HemisphericLight,
    Plane,
    StandardMaterial,
    StandardTexture,
  } from '$lib'
  import { TextureTargets } from '$lib/types/enums/TextureTargets'
  import type { PageMeta } from '@vitebook/client'
  import { ControlsAddon } from '@vitebook/client/addons'
  import * as BABYLON from 'babylonjs'

  export const __pageMeta: PageMeta = {
    title: 'StandardTexture',
    description: '',
  }
</script>

<script lang="ts">
  // material
  let ambientHex = '#000000'
  let diffuseHex = '#666666'
  let emissiveHex = '#666666'
  let specularHex = '#ffffff'
  let roughness = 1
  let separateCullingPass = false
  let invertNormalMapX = false
  let invertNormalMapY = false
  let invertRefractionY = false
  let backfaceCulling = false

  $: ambient = BABYLON.Color3.FromHexString(ambientHex)
  $: diffuse = BABYLON.Color3.FromHexString(diffuseHex)
  $: emissive = BABYLON.Color3.FromHexString(emissiveHex)
  $: specular = BABYLON.Color3.FromHexString(specularHex)

  // texture
  let diffuseTexture = true
  let specularTexture = true
  let aoTexture = true
  let normalTexture = true
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
    direction={new BABYLON.Vector3(-10, -20, -10)}
    position={new BABYLON.Vector3(2, 6, 2)}
  />
  <ArcRotateCamera target={BABYLON.Vector3.Zero()} radius={2} />
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
    >
      {#if diffuseTexture}
        <StandardTexture
          url="/assets/textures/metal/metal_diffuse.jpg"
          uScale={2}
          vScale={2}
          textureTarget={TextureTargets.DIFFUSE}
        />
      {/if}
      {#if specularTexture}
        <StandardTexture
          url="/assets/textures/metal/metal_specular.jpg"
          uScale={2}
          vScale={2}
          textureTarget={TextureTargets.SPECULAR}
        />
      {/if}
      {#if aoTexture}
        <StandardTexture
          url="/assets/textures/metal/metal_ao.jpg"
          uScale={2}
          vScale={2}
          textureTarget={TextureTargets.AMBIENT}
        />
      {/if}
      {#if normalTexture}
        <StandardTexture
          url="/assets/textures/metal/metal_normal.jpg"
          uScale={2}
          vScale={2}
          textureTarget={TextureTargets.BUMP}
        />
      {/if}
    </StandardMaterial>
  </Plane>
</Canvas>

<ControlsAddon>
  <fieldset>
    <legend>Texture</legend>
    <label style="margin-top: 24px;display:block;">
      diffuseTexture <input type="checkbox" bind:checked={diffuseTexture} />
    </label>
    <label style="margin-top: 24px;display:block;">
      specularTexture <input type="checkbox" bind:checked={specularTexture} />
    </label>
    <label style="margin-top: 24px;display:block;">
      aoTexture <input type="checkbox" bind:checked={aoTexture} />
    </label>
    <label style="margin-top: 24px;display:block;">
      normalTexture <input type="checkbox" bind:checked={normalTexture} />
    </label>
  </fieldset>
  <fieldset style="margin-top: 24px;display:block;">
    <legend>Material</legend>
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
    <fieldset style="margin-top: 24px;display:block;">
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
  </fieldset>
</ControlsAddon>
