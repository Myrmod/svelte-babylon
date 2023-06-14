---
title: TextPlane
description: Renders a Plane with dynamic text written on it.
---

<script>
  import TextPlaneStory from 'svelte-babylon/prebuilds/TextPlane/TextPlane.story.svelte'
  import ExampleWrapper from '$routes/docs/_components/ExampleWrapper.svelte'
</script>

Renders a Plane with dynamic text written on it.

## Example

<ExampleWrapper>
  <TextPlaneStory />
</ExampleWrapper>

## Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import TextPlane from 'svelte-babylon/prebuilds/TextPlane/index.svelte'

	const text = 'Text Plane'
	const width = 16 / 5.2
	const height = 9 / 5.2
	const backgroundColor = '#ffffff'
	const color = '#000000'
	const fontSizeMultiplier = 1
	const sizeMultiplier = 60
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene>
		<HemisphericLight />
		<ArcRotateCamera radius={5} beta={1} />
		<TextPlane
			{text}
			planeOptions={{ width, height }}
			{backgroundColor}
			{color}
			{fontSizeMultiplier}
			{sizeMultiplier}
		/>
	</Scene>
</Canvas>
```
