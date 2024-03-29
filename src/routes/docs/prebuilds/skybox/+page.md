---
title: Skybox
description: A box to surround your scene with.
---

<script>
  import SkyboxStory from 'svelte-babylon/prebuilds/Skybox/Skybox.story.svelte'
  import ExampleWrapper from '$routes/docs/_components/ExampleWrapper.svelte'
</script>

A box to surround your scene with.

By the nature of the underlying workings of the Skybox it is required to provide the assets in a specific way.
In the example code below, the path <i>/assets/textures/skybox/sky</i> maps to the follwoing files:

- <i>/assets/textures/skybox/sky_nx.jpg</i>
- <i>/assets/textures/skybox/sky_ny.jpg</i>
- <i>/assets/textures/skybox/sky_nz.jpg</i>
- <i>/assets/textures/skybox/sky_px.jpg</i>
- <i>/assets/textures/skybox/sky_py.jpg</i>
- <i>/assets/textures/skybox/sky_pz.jpg</i>

## Example

<ExampleWrapper>
  <SkyboxStory />
</ExampleWrapper>

## Example Code

```svelte
<script lang="ts" context="module">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import Skybox from 'svelte-babylon/prebuilds/Skybox/index.svelte'
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
		<ArcRotateCamera />
		<Skybox rootUrl="/assets/textures/skybox/sky" />
	</Scene>
</Canvas>
```
