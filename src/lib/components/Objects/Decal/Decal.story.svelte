<script lang="ts" context="module">
  import { AbstractMesh, ActionEvent, Color3, Mesh, Vector3 } from '@babylonjs/core'
  import type { PageMeta } from '@vitebook/client'
  import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
  import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
  import StandardMaterial from 'svelte-babylon/components/Materials/StandardMaterial/index.svelte'
  import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
  import Decal from 'svelte-babylon/components/Objects/Decal/index.svelte'
  import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'

  export const __pageMeta: PageMeta = {
    title: 'Decal',
    description:
      'These are usually used to add details on meshes (bullets hole, local details, etc...), a decal is a mesh produced from a subset of a previous one with a small offset in order to appear on top of it. https://doc.babylonjs.com/divingDeeper/mesh/decals',
  }
</script>

<script lang="ts">
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

  // handling bullet holes
  let bulletHoles: Array<{
    position: Vector3
  }> = []
  function handlePick(e: ActionEvent) {
    const temp = bulletHoles

    temp.push({
      position: e.additionalData.pickedPoint,
    })
    bulletHoles = temp
  }
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
  <Box y={3} bind:object onPick={handlePick}>
    {#each bulletHoles as hole}
      <Decal
        options={{
          size: new Vector3(0.25, 0.25, 0.25),
          position: hole.position,
        }}
      >
        <StandardMaterial diffuseColor={Color3.Black()} />
      </Decal>
    {/each}
  </Box>
  <Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
</Canvas>
