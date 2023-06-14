---
title: Canvas
description: That's the root of your scene, where all the other elements are placed into. It is basically an implementation of https://doc.babylonjs.com/divingDeeper/scene as well as https://doc.babylonjs.com/typedoc/classes/babylon.engine.
---

<script>
  import CanvasStory from 'svelte-babylon/components/Canvas/Canvas.story.svelte'
  import ExampleWrapper from '$routes/docs/_components/ExampleWrapper.svelte'
</script>

That's the root of your scene, where all the other elements are placed into. It is basically an implementation of https://doc.babylonjs.com/divingDeeper/scene as well as https://doc.babylonjs.com/typedoc/classes/babylon.engine.

## Example

<ExampleWrapper>
  <CanvasStory />
</ExampleWrapper>

## Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Color4 } from '@babylonjs/core/Maths/math.color'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	let antialiasing = false
	let backgroundColor = '#454545'
	let preserveDrawingBuffer = true
	let stencil = true

	$: clearColor = Color4.FromHexString(backgroundColor)
</script>

<Canvas
	{antialiasing}
	engineOptions={{
		preserveDrawingBuffer,
		stencil,
	}}
>
	<Scene {clearColor}>
		<HemisphericLight intensity={0.25} />
		<DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
		<ArcRotateCamera />
		<Box />
	</Scene>
</Canvas>
```
