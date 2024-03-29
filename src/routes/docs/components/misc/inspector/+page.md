---
title: Inspector
description: Babylon.js inspector is a visual debugging tool created to help pinpoint issues you may have with a scene.
---

<script>
  import InspectorStory from 'svelte-babylon/components/Misc/Inspector/Inspector.story.svelte'
  import ExampleWrapper from '$routes/docs/_components/ExampleWrapper.svelte'
</script>

Babylon.js inspector is a visual debugging tool created to help pinpoint issues you may have with a scene.

[BabylonJS reference](https://doc.babylonjs.com/toolsAndResources/tools/inspector)

:::admonition type="warning"
The user interface of the inpspector is written in react. It would be quite a heavy load to rewrite it in either svelte or without any framework.
You can always create custom debug layers using the tools you know. You can for example use the `$scene` object of you `Scene` component as a starting point. There is nothing custom built into svelte-babylon. As long as you don't use the `Inspector` in production there wont be any negative impact.

For more see the babylonjs
:::

## Example

<ExampleWrapper id='InspectorStory'>
  <InspectorStory />
</ExampleWrapper>

### Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Inspector from 'svelte-babylon/components/Misc/Inspector/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import '@babylonjs/core/Debug/debugLayer'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
</script>

<Canvas antialiasing>
	<Scene>
		<HemisphericLight intensity={0.5} />
		<DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
		<ArcRotateCamera />
		<Box />
		<Inspector />
	</Scene>
</Canvas>
```
