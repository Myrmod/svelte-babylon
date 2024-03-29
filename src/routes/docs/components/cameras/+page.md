---
title: Cameras
description: Svelte-Babylon offers different cameras for you scene. All of them have different use cases.
---

<script>
  import BoxStory from 'svelte-babylon/components/Objects/Box/Box.story.svelte'
  import UniversalCameraStory from 'svelte-babylon/components/Cameras/UniversalCamera/UniversalCamera.story.svelte'
  import ExampleWrapper from '$routes/docs/_components/ExampleWrapper.svelte'
</script>

Svelte-Babylon offers different cameras for you scene. All of them have different use cases.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/cameras/camera_introduction)

## ArcRotateCamera

This camera always points towards a given target position and can be rotated around that target with the target as the center of rotation. It can be controlled with cursors and mouse, or with touch events.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/cameras/camera_introduction#arc-rotate-camera)

### Example

<ExampleWrapper>
  <BoxStory />
</ExampleWrapper>

### Example Code

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

## UniversalCamera

The UniversalCamera is controlled by the keyboard, mouse, touch, or gamepad depending on the input device used, with no need for the controller to be specified. You can also extends its functionality.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/cameras/camera_introduction#universal-camera)

### Example

<ExampleWrapper>
  <UniversalCameraStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import UniversalCamera from 'svelte-babylon/components/Cameras/UniversalCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene>
		<HemisphericLight intensity={0.25} />
		<DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
		<UniversalCamera position={new Vector3(0, 0, -10)} />
		<Box />
	</Scene>
</Canvas>
```

## FreeCamera

The FreeCamera allows you to move using the arrow keys by default. You can also extends its functionality. However the FreeCamera is essentially deprecated, so using the UniversalCamera is recommended.

[BabylonJS reference](https://doc.babylonjs.com/typedoc/classes/babylon.freecamera)

## TargetCamera

A target camera takes a mesh or position as a target and continues to look at it while it moves.
This is the base of the FollowCamera, ArcRotateCamera and FreeCamera.

[BabylonJS reference](https://doc.babylonjs.com/typedoc/classes/babylon.targetcamera)

## ArcFollowCamera

Arc Rotate version of the follow camera.
It still follows a Defined mesh but in an Arc Rotate Camera fashion.

[BabylonJS reference](https://doc.babylonjs.com/typedoc/classes/babylon.arcfollowcamera)

## FlyCamera

FlyCamera imitates free movement in 3D space, think "a ghost in space." It comes with an option to gradually correct Roll, and also an option to mimic banked-turns.

Its defaults are:

1. Keyboard - The A and D keys move the camera left and right. The W and S keys move it forward and backward. The E and Q keys move it up and down.

2. Mouse - Rotates the camera about the Pitch and Yaw (X, Y) axes with the camera as the origin. Holding the right mouse button rotates the camera about the Roll (Z) axis with the camera as the origin.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/cameras/camera_introduction#flycamera)

## FollowCamera

The FollowCamera does what it says on the tin. Give it a mesh as a target, and from whatever position it is currently at it will move to a goal position from which to view the target. When the target moves, so will the Follow Camera.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/cameras/camera_introduction#followcamera)
