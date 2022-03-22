<script lang="ts">
  import * as BABYLON from 'babylonjs'
  import { Box, Cylinder } from 'svelte-babylon'

  export let platform: {
    self: BABYLON.Mesh
  } = undefined
  export let screen: {
    self: BABYLON.Mesh
  } = undefined
  export let position = BABYLON.Vector3.Zero()
  export let name = 'Platform'
  /**
   * rotation in degree
   */
  export let rotation: number = 0
</script>

<Cylinder
  y={1}
  bind:object={platform}
  {position}
  rotation={new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(rotation), 0)}
  {name}
  options={{
    height: 1,
    diameterBottom: 10,
    diameterTop: 8,
  }}
  checkCollisions
>
  <Box
    name={`${name}-Screen`}
    position={new BABYLON.Vector3(1, 3, 1)}
    rotation={new BABYLON.Vector3(0, Math.PI / 4, 0)}
    options={{
      width: 19 / 5,
      height: 9 / 5,
      depth: 0.25,
    }}
    bind:object={screen}
    checkCollisions
  />
</Cylinder>
