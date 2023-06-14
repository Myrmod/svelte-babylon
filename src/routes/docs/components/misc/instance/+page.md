---
title: Instance
description: The Instance component allows you to create multiple instances of the parent Object. This is so you reduce the amount of render calls between the CPU and the GPU, through hardware accelerated rendering.
---

<script>
  import InstanceStory from 'svelte-babylon/components/Misc/Instance/Instance.story.svelte'
  import ExampleWrapper from '$routes/docs/_components/ExampleWrapper.svelte'
</script>

The Instance component allows you to create multiple instances of the parent Object. This is so you reduce the amount of render calls between the CPU and the GPU, through hardware accelerated rendering.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/copies/instances)

## Example

Here we're rendering 10000 instances of our `Box` component at random positions.

<ExampleWrapper id='InstanceStory'>
  <InstanceStory />
</ExampleWrapper>

### Code

```svelte
<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
	import Instance from '$lib/components/Misc/Instance/index.svelte'
	import Box from '$lib/components/Objects/Box/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
	import type { InstancedMesh } from '@babylonjs/core'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	function handleInstanceCreation(instance: InstancedMesh) {
		const randomPosition = () => Math.random() * 10 * (Math.round(Math.random()) ? 1 : -1)
		instance.position = new Vector3(randomPosition(), randomPosition(), randomPosition())
	}
</script>

<Canvas antialiasing>
	<Scene>
		<HemisphericLight intensity={0.5} />
		<DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
		<ArcRotateCamera radius={50} />
		<Box>
			<Instance number={10000} onCreated={handleInstanceCreation} />
		</Box>
	</Scene>
</Canvas>
```
