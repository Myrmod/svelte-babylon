---
title: Getting Started
description: A short introduction with tutorial and explanation for Svelte-Babylon.
---

<script>
  import BoxStory from 'svelte-babylon/components/Objects/Box/Box.story.svelte'
  import ExampleWrapper from '$routes/docs/_components/ExampleWrapper.svelte'
</script>

Svelte-Babylon is a [BabylonJS](https://www.babylonjs.com/) component library for [Svelte](https://svelte.dev/). It is highly inspired by [svelte-cubed](https://svelte-cubed.vercel.app/), a component library for building [Three.js](https://threejs.org/) scene graphs in Svelte apps.

If you find anything not working as expected, it would be great for you to open an [issue](https://github.com/Myrmod/svelte-babylon/issues).

## Creating a project

```bash
pnpm create svelte@latest my-new-app
cd my-new-app
npm install
npm run dev
```

Then install BabylonJS and Svelte-Babylon:

```bash
npm install @babylonjs/core svelte-babylon
```

Now you're set up to build your own 3D scenes.

## Your first scene

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
</script>

<Canvas>
	<Scene>
		<HemisphericLight />
		<ArcRotateCamera />
		<Box />
	</Scene>
</Canvas>
```

As Svelte-Babylon is a libray that implements BabylonJS in a component driven manner, we can create a very simple scene using only our Svelte knowledge with barely any regard to BabylonJS itself.

Our `Canvas` component is the wrapper of the BabylonJS [Engine](https://doc.babylonjs.com/typedoc/classes/babylon.engine) and an `HTMLCanvasElement`. The `Scene` component implements a BabylonJS [Scene](https://doc.babylonjs.com/typedoc/classes/babylon.scene).
Furthermore all components, that are allowed to have children create a [svelte context](https://svelte.dev/tutorial/context-api) which holds the corresponding BabylonJS implementation.
This context is bindable, eg. via `<Canvas bind:engine>`. This allows you to use BabylonJS with all of its features, even if implementations are missing. You have to refer to the [BabylonJS documentation](https://doc.babylonjs.com/) though.

Let's add `Ground` and adjust the positions of the box. We also add some settings to the `Canvas` to make the scene look a little sharper.

```js
<script lang="ts">
  import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
  import Scene from 'svelte-babylon/components/Scene/index.svelte'
  import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
+  import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
+  import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
+  import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
+  import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
+  import type { Writable } from 'svelte/types/runtime/store'

+  let object: <Writable<Mesh>
</script>

- <Canvas>
+ <Canvas
+  antialiasing
+  engineOptions={{
+    preserveDrawingBuffer: true,
+    stencil: true,
+  }}
+ >
  <Scene>
    <HemisphericLight />
    <ArcRotateCamera />
-   <Box />
+   <Box y={3} bind:object />
+   <Ground
+     options={{ width: 6, height: 6 }}
+     y={1}
+   />
  </Scene>
</Canvas>
```

For the `Ground` we set it's width and height. For the `Ground` as well as the `Box` we set their `y-position` to have a better look at them.
Furthermore we bind the `Box` components object property to a variable.

Using BabylonJS itself we can create a 3D-Vector (a point in the 3D space) which we can pass as a whole to the `target` property of the `ArcRotateCamera` for it to focus on the position where the `Box` is initially placed. Since we bound to the `Box` components object we could've also used `$object.position` to archive a similar result. However we would need to make sure, that the `Box` component has mounted before the `ArcRotateCamera`.

Now we can add some shadow

```js
<script lang="ts">
  import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
  import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
  import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
  import Scene from 'svelte-babylon/components/Scene/index.svelte'
+  import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
  import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
  import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
  import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
  import type { Writable } from 'svelte/types/runtime/store'

  let object: <Writable<Mesh>

+  let shadowObjects: Array<Mesh>
+  $: {
+    const temp: typeof shadowObjects = []
+    if ($object) {
+      temp.push($object)
+    }
+    shadowObjects = temp
+  }
</script>

 <Canvas
  antialiasing
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
 >
  <Scene>
-  <HemisphericLight />
+  <HemisphericLight intensity={0.5} />
+  <DirectionalLight
+    intensity={0.25}
+    direction={new Vector3(-10, -20, -10)}
+    position={new Vector3(2, 6, 2)}
+    castShadowOf={shadowObjects}
+  />
  <ArcRotateCamera />
  <Box y={3} bind:object />
  <Ground
    options={{ width: 6, height: 6 }}
    y={1}
+   receiveShadows
  />
  </Scene>
</Canvas>
```

Shadows are somewhat tricky to handle. A light needs to know what objects it should cast a shadow from. So we need to provide it an array of references to the objects, which should have a shadow.

Objects like our `Ground` components' have to know, that there might be a shadow to be cast on them. So we have to add the `receiveShadows` attribute to them.

And that's it. Your first scene using Svelte Babylon. Here is the whole code:

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
	import type { Writable } from 'svelte/types/runtime/store'

	let object: Writable<Mesh>

	let shadowObjects: Array<Mesh>
	$: {
		const temp: typeof shadowObjects = []
		if ($object) {
			temp.push($object)
		}
		shadowObjects = temp
	}
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene>
		<HemisphericLight intensity={0.5} />
		<DirectionalLight
			intensity={0.25}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
			castShadowOf={shadowObjects}
		/>
		<ArcRotateCamera target={new Vector3(0, 3, 0)} />
		<Box y={3} bind:object />
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
```

<ExampleWrapper text='See code in action'>
  <BoxStory />
</ExampleWrapper>

If there're any svelte specific question you can ask via [discord](https://discord.com/channels/457912077277855764/), questions for BabylonJS can go to the [forum](https://forum.babylonjs.com/).
In both cases you can use `@myrmod` to give a shoutout for me, since there is only one developer for now :).

Issues and feature requests can be place in [GitHub](https://github.com/Myrmod/svelte-babylon/issues).
