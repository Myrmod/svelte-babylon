<script lang="ts">
  import StandardMaterial from '$lib/components/Materials/StandardMaterial/index.svelte'
  import Instance from '$lib/components/Misc/Instance/index.svelte'
  import type { InstancedMesh, TransformNode as BTransformNode } from '@babylonjs/core'
  import { Color3 } from '@babylonjs/core/Maths/math.color.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector.js'
  import type { Scene as BScene } from '@babylonjs/core/scene.js'
  import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
  import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
  import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
  import Plane from 'svelte-babylon/components/Objects/Plane/index.svelte'
  import Scene from 'svelte-babylon/components/Scene/index.svelte'
  import TransformNode from 'svelte-babylon/components/TransformNode/index.svelte'
  import type { Writable } from 'svelte/types/runtime/store'

  let width = 3
  let shuffleCount = 10
  let scene: Writable<BScene>
  let enabled = false
  let transformNode: Writable<BTransformNode>
  const planeDetailsArray = [
    {
      color: new Color3(255 / 255, 255 / 255, 255 / 255),
      rotation: new Vector3(Math.PI / 2, 0, 0),
      normal: new Vector3(0, 1, 0),
    },
    {
      color: new Color3(255 / 255, 213 / 255, 0 / 255),
      rotation: new Vector3(-Math.PI / 2, 0, 0),
      normal: new Vector3(0, -1, 0),
    },
    {
      color: new Color3(0 / 255, 70 / 255, 173 / 255),
      rotation: new Vector3(0, -Math.PI / 2, 0),
      normal: new Vector3(1, 0, 0),
    },
    {
      color: new Color3(0 / 255, 155 / 255, 72 / 255),
      rotation: new Vector3(0, Math.PI / 2, 0),
      normal: new Vector3(-1, 0, 0),
    },
    {
      color: new Color3(255 / 255, 88 / 255, 0 / 255),
      rotation: new Vector3(Math.PI, 0, 0),
      normal: new Vector3(0, 0, 1),
    },
    {
      color: new Color3(183 / 255, 18 / 255, 52 / 255),
      rotation: new Vector3(0, 0, 0),
      normal: new Vector3(0, 0, -1),
    },
  ]

  let cubes: Array<InstancedMesh> = []

  function handleBoxInstanceCreation(instance: InstancedMesh, _index: number) {
    if (cubes.length === Math.pow(width, 3)) {
      return
    }
    instance.isVisible = true
    instance.parent = $transformNode
    cubes = [...cubes, instance]
  }

  function handlePlaneInstanceCreation(
    instance: InstancedMesh,
    _index: number,
    planeDetails: typeof planeDetailsArray[0],
    cube: InstancedMesh,
  ) {
    instance.isVisible = true
    instance.isPickable = true
    instance.parent = cube
    instance.position = planeDetails.normal.scale(0.501).clone()
    instance.rotation = planeDetails.rotation.clone()
    instance.renderOutline = true
  }

  // position our instances
  $: if (cubes.length === Math.pow(width, 3)) {
    let counter = 0
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < width; y++) {
        for (let z = 0; z < width; z++) {
          cubes[counter].position = new Vector3(x, y, z)
          counter++
        }
      }
    }
  }

  function setupDragCallbacks() {}

  function findCubesByPlaneDetails(planeDetails: typeof planeDetailsArray[0]) {
    return cubes.filter(
      cube => !cubes.some(ocube => ocube.position.equals(cube.position.add(planeDetails.normal))),
    )
  }
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <Scene bind:scene clearColor={Color3.White()}>
    <HemisphericLight />
    <ArcRotateCamera
      radius={10}
      target={new Vector3(Math.floor(width / 2), Math.floor(width / 2), Math.floor(width / 2))}
    />
    <TransformNode bind:object={transformNode}>
      {#if cubes.length === Math.pow(width, 3)}
        {#each planeDetailsArray as planeDetails}
          <Plane options={{ size: 0.96 }}>
            <StandardMaterial diffuseColor={planeDetails.color} specularColor={Color3.Black()} />
            {#each findCubesByPlaneDetails(planeDetails) as cube}
              <Instance
                onCreated={(instance, index) =>
                  handlePlaneInstanceCreation(instance, index, planeDetails, cube)}
              />
            {/each}
          </Plane>
        {/each}
      {/if}
      <Box isVisible={false}>
        <StandardMaterial diffuseColor={Color3.Black()} specularColor={Color3.Black()} />
        <Instance number={Math.pow(width, 3)} onCreated={handleBoxInstanceCreation} />
      </Box>
    </TransformNode>
  </Scene>
</Canvas>
