---
title: Layer
description: This represents a full screen 2d layer. This can be useful to display a picture in the background of your scene for instance.
---

<script>
  import LayerStory from 'svelte-babylon/components/Layer/Layer.story.svelte'
  import LayerFromWebCamStory from 'svelte-babylon/components/Layer/LayerFromWebCam.story.svelte'
  import LayerFromBase64StringStory from 'svelte-babylon/components/Layer/LayerFromBase64String.story.svelte'
  import ExampleWrapper from '$routes/docs/_components/ExampleWrapper.svelte'
</script>

This represents a full screen 2d layer. This can be useful to display a picture in the background of your scene for instance.

[BabylonJS reference](https://doc.babylonjs.com/typedoc/classes/babylon.layer)

## Default

<ExampleWrapper id='LayerStory'>
  <LayerStory />
</ExampleWrapper>

### Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import Layer from 'svelte-babylon/components/Layer/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
</script>

<Canvas>
	<Scene>
		<HemisphericLight intensity={0.25} />
		<DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
		<ArcRotateCamera />
		<Layer img="/assets/images/stars.jpg" />
		<Box />
	</Scene>
</Canvas>
```

## LayerFromWebCam

For ease of use there has been added a `LayerFromWebCam` component. This component renders a web cam to your scene.

<ExampleWrapper id='LayerFromWebCam'>
  <LayerFromWebCamStory />
</ExampleWrapper>

### Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import LayerFromWebCam from 'svelte-babylon/components/Layer/LayerFromWebCam.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
</script>

<Canvas>
	<Scene>
		<HemisphericLight intensity={0.25} />
		<DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
		<ArcRotateCamera />
		<LayerFromWebCam />
		<Box />
	</Scene>
</Canvas>
```

## LayerFromBase64String

For ease of use there has been added a `LayerFromBase64String` component. This component renders a base64 image to your scene.

<ExampleWrapper id='LayerFromBase64StringStory'>
  <LayerFromBase64StringStory />
</ExampleWrapper>

### Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import LayerFromBase64String from 'svelte-babylon/components/Layer/LayerFromBase64String.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
</script>

<Canvas>
	<Scene>
		<HemisphericLight intensity={0.25} />
		<DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
		<ArcRotateCamera />
		<LayerFromBase64String data="data:image/png;base64,iVBORw0..." />
		<Box />
	</Scene>
</Canvas>
```
