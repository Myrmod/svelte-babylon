---
title: PhysicsImpostors
description: To enable physics on an object, like a mesh or camera (IPhysicsEnabledObject) you need to assign it a physics impostor.
---

<script>
  import PhysicsImpostorStory from 'svelte-babylon/components/PhysicsImpostor/PhysicsImpostor.story.svelte'
  import ExampleWrapper from '$routes/docs/_components/ExampleWrapper.svelte'
</script>

To enable physics on an object, like a mesh or camera (IPhysicsEnabledObject) you need to assign it a physics impostor.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/physics/usingPhysicsEngine#babylons-physics-impostor)

### Example

<ExampleWrapper>
  <PhysicsImpostorStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts" context="module">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import Sphere from 'svelte-babylon/components/Objects/Sphere/index.svelte'
	import PhysicsImpostor from 'svelte-babylon/components/PhysicsImpostor/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import { PhysicsImpostor as PI } from '@babylonjs/core/Physics/physicsImpostor.js'
</script>

<script lang="ts">
	let antialiasing = false
	let preserveDrawingBuffer = true
	let stencil = true
</script>

<Canvas
	{antialiasing}
	engineOptions={{
		preserveDrawingBuffer,
		stencil,
	}}
>
	<Scene physicsEnabled>
		<HemisphericLight intensity={0.25} />
		<DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
		<ArcRotateCamera radius={15} beta={1} />
		<Sphere y={5}>
			<PhysicsImpostor
				type={PI.SphereImpostor}
				options={{
					mass: 10,
					restitution: 0.9,
				}}
			/>
		</Sphere>
		<Ground
			options={{
				width: 10,
				height: 10,
			}}
		>
			<PhysicsImpostor
				options={{
					mass: 0,
					restitution: 0.9,
				}}
			/>
		</Ground>
	</Scene>
</Canvas>
```
