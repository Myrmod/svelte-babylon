---
title: XRScene
description: With the XRScene component you have the basic setup for implementing a virtual and augmented reality application.
---

<script>
  import XRSceneStory from 'svelte-babylon/components/XRScene/XRScene.story.svelte'
  import ExampleWrapper from '$routes/docs/_components/ExampleWrapper.svelte'
</script>

With the XRScene component you have the basic setup for implementing a virtual and augmented reality application.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/webXR/webXRExperienceHelpers)

:::admonition type="note"
If you don't have appropriate hardware the following browser extensions might help you:
https://chrome.google.com/webstore/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje?hl=de
https://addons.mozilla.org/de/firefox/addon/webxr-api-emulator/
:::

:::admonition type="experimental"
Because of missing hardware and experience it so far wasn't possible to test and build this in its entirety. So there might be big changes in the API and improvements to be made.
:::

## Example

<ExampleWrapper id='XRSceneStory'>
  <XRSceneStory />
</ExampleWrapper>

### Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import XRScene from 'svelte-babylon/components/XRScene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
</script>

<Canvas antialiasing>
	<XRScene>
		<HemisphericLight intensity={0.25} />
		<DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
		<ArcRotateCamera />
		<Box checkCollisions />
		<Ground checkCollisions options={{ width: 50, height: 50 }} y={-0.5} />
	</XRScene>
</Canvas>
```
