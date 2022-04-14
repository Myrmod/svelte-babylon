<script lang="ts">
  import { Color3, Mesh, Tools, Vector3 } from '@babylonjs/core'
  import { Box, Cylinder, Plane, StandardMaterial } from 'svelte-babylon'

  export let platform: {
    self: Mesh
  } = undefined
  export let screen: {
    self: Mesh
  } = undefined
  export let position = Vector3.Zero()
  export let name = 'Platform'
  /**
   * rotation in degree
   */
  export let rotation: number = 0
</script>

<Cylinder
  bind:object={platform}
  {position}
  rotation={new Vector3(0, Tools.ToRadians(rotation), 0)}
  {name}
  options={{
    height: 1,
    diameterBottom: 10,
    diameterTop: 8,
  }}
  checkCollisions
  receiveShadows
>
  <slot>
    <Box
      name={`${name}-Screen`}
      position={new Vector3(1, 3, 1)}
      rotation={new Vector3(0, Math.PI / 4, 0)}
      options={{
        width: 16 / 5,
        height: 9 / 5,
        depth: 0.25,
      }}
      bind:object={screen}
      checkCollisions
    >
      <StandardMaterial diffuseColor={Color3.Black()} />
      <slot name="screen">
        <Plane
          options={{
            width: 16 / 5.2,
            height: 9 / 5.2,
          }}
          position={new Vector3(0, 0, -0.13)}
          checkCollisions
        >
          <slot name="screen-material" />
        </Plane>
      </slot>
    </Box>
  </slot>
</Cylinder>
