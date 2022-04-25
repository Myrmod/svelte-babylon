<script lang="ts" context="module">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
  import Ground from '$lib/components/Objects/Ground/index.svelte'
  import Sphere from '$lib/components/Objects/Sphere/index.svelte'
  import PhysicsImpostor from '$lib/components/PhysicsImpostor/index.svelte'
  import type RootContext from '$lib/types'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import { PhysicsImpostor as PI } from '@babylonjs/core/Physics/physicsImpostor.js'
</script>

<script lang="ts">
  let antialiasing = false
  let preserveDrawingBuffer = true
  let stencil = true
  let root: RootContext
</script>

<Canvas
  {antialiasing}
  engineOptions={{
    preserveDrawingBuffer,
    stencil,
  }}
  physicsEnabled
  bind:root
>
  <HemisphericLight intensity={0.25} />
  <DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
  <ArcRotateCamera radius={15} beta={1} />
  <Sphere y={5}>
    {#if root?.scene.physicsEnabled}
      <PhysicsImpostor
        type={PI.SphereImpostor}
        options={{
          mass: 10,
          restitution: 0.9,
        }}
      />
    {/if}
  </Sphere>
  <Ground
    options={{
      width: 10,
      height: 10,
    }}
  >
    {#if root?.scene.physicsEnabled}
      <PhysicsImpostor
        options={{
          mass: 0,
          restitution: 0.9,
        }}
      />
    {/if}
  </Ground>
</Canvas>
