<script lang="ts" context="module">
  import {
    ArcRotateCamera,
    Box,
    Canvas,
    DirectionalLight,
    Ground,
    HemisphericLight,
    Screen,
  } from '$lib'
  import type RootContext from '$lib/types'
  import type { PageMeta } from '@vitebook/client'
  import { ControlsAddon } from '@vitebook/client/addons'
  import * as BABYLON from 'babylonjs'

  export const __pageMeta: PageMeta = {
    title: 'Screen',
    description: '',
  }
</script>

<script lang="ts">
  const objectPosition = new BABYLON.Vector3(0, 3, 0)
  let root: RootContext

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
  $: if (object && root.scene) {
    root.scene.onBeforeRenderObservable.add(() => {
      object.self.rotate(BABYLON.Vector3.Up(), 0.01)
    })
  }

  let mainCamera: BABYLON.ArcRotateCamera
  let showScreen = true
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
  bind:root
>
  <HemisphericLight intensity={0.5} />
  <DirectionalLight
    intensity={0.25}
    direction={new BABYLON.Vector3(-10, -20, -10)}
    position={new BABYLON.Vector3(2, 6, 2)}
    castShadowOf={shadowObjects}
  />
  <ArcRotateCamera target={objectPosition} bind:camera={mainCamera} />
  <Box y={3} bind:object />
  <Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
  {#if showScreen}
    <Screen />
  {/if}
</Canvas>

<ControlsAddon>
  <label style="margin-top: 24px;display:block;">
    show screen <input type="checkbox" bind:checked={showScreen} />
  </label>
</ControlsAddon>
