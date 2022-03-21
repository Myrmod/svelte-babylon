<script lang="ts">
  import * as BABYLON from 'babylonjs'
  import { Polygon } from 'svelte-babylon'

  export let object: {
    self: BABYLON.Mesh
  } = undefined
  export let position = BABYLON.Vector3.Zero()
</script>

<Polygon
  y={1}
  bind:object
  {position}
  options={{
    shape: [
      new BABYLON.Vector3(2, 0, -2),
      new BABYLON.Vector3(2, 0, 0),
      new BABYLON.Vector3(3, 0, 2),
      new BABYLON.Vector3(1, 0, 2),
      new BABYLON.Vector3(-3, 0, 3),
      new BABYLON.Vector3(-3, 0, 1),
      new BABYLON.Vector3(-2, 0, -2),
      new BABYLON.Vector3(-2, 0, -3),
      new BABYLON.Vector3(2, 0, -3),
    ],
    depth: 1,
  }}
/>
