<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import LightGizmo from '$lib/components/Gizmos/LightGizmo/index.svelte'
  import PointLight from '$lib/components/Lights/PointLight/index.svelte'
  import Box from '$lib/components/Objects/Box/index.svelte'
  import Ground from '$lib/components/Objects/Ground/index.svelte'
  import { Color3 } from '@babylonjs/core/Maths/math.color'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh'

  let intensity = 0.5
  let diffuseHex = '#ffffff'
  let specularHex = '#ffffff'

  let box: {
    self: Mesh | AbstractMesh
  }

  let shadowObjects: Array<typeof box['self']>
  $: {
    const temp: typeof shadowObjects = []
    if (box?.self) {
      temp.push(box.self)
    }
    shadowObjects = temp
  }

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
  <PointLight
    {intensity}
    position={new Vector3(2, 6, 2)}
    castShadowOf={shadowObjects}
    {specular}
    {diffuse}
  >
    <LightGizmo />
  </PointLight>
  <ArcRotateCamera target={new Vector3(0, 3, 0)} />
  <Box y={3} bind:object={box} />
  <Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
</Canvas>
