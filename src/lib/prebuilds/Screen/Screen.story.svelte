<script lang="ts" context="module">
  import type RootContext from '$lib/types'
  import { AbstractMesh, ArcRotateCamera as ACamera, Mesh, Vector3 } from '@babylonjs/core'
  import type { PageMeta } from '@vitebook/client'
  import { ControlsAddon } from '@vitebook/client/addons'
  import {
    ArcRotateCamera,
    Box,
    Canvas,
    DirectionalLight,
    Ground,
    HemisphericLight,
    Screen,
  } from 'svelte-babylon'

  export const __pageMeta: PageMeta = {
    title: 'Screen',
    description: '',
  }
</script>

<script lang="ts">
  const objectPosition = new Vector3(0, 3, 0)
  let root: RootContext

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
  $: if (object && root.scene) {
    root.scene.onBeforeRenderObservable.add(() => {
      object.self.rotate(Vector3.Up(), 0.01)
    })
  }

  let mainCamera: ACamera
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
    direction={new Vector3(-10, -20, -10)}
    position={new Vector3(2, 6, 2)}
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
