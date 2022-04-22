<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import StandardMaterial from '$lib/components/Materials/StandardMaterial/index.svelte'
  import Box from '$lib/components/Objects/Box/index.svelte'
  import Decal from '$lib/components/Objects/Decal/index.svelte'
  import Ground from '$lib/components/Objects/Ground/index.svelte'
  import type { ActionEvent } from '@babylonjs/core/Actions/actionEvent'
  import { Color3 } from '@babylonjs/core/Maths/math.color'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'

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
  <ArcRotateCamera target={new Vector3(0, 3, 0)} />
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
