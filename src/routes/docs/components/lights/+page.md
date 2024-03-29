---
title: Lights
description: Lights are used, as you would expect, to affect how meshes are seen, in terms of both illumination and colour. All meshes allow light to pass through them unless shadow generation is activated. The default number of lights allowed is four but this can be increased.
---

<script>
  import DirectionalLightStory from 'svelte-babylon/components/Lights/DirectionalLight/DirectionalLight.story.svelte'
  import HemisphericLightStory from 'svelte-babylon/components/Lights/HemisphericLight/HemisphericLight.story.svelte'
  import PointLightStory from 'svelte-babylon/components/Lights/PointLight/PointLight.story.svelte'
  import SpotLightStory from 'svelte-babylon/components/Lights/SpotLight/SpotLight.story.svelte'
  import ExampleWrapper from '$routes/docs/_components/ExampleWrapper.svelte'
</script>

Lights are used, as you would expect, to affect how meshes are seen, in terms of both illumination and colour. All meshes allow light to pass through them unless shadow generation is activated. The default number of lights allowed is four but this can be increased.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/lights/lights_introduction)

## DirectionalLight

A directional light is defined by a direction (what a surprise!). The light is emitted from everywhere in the specified direction, and has an infinite range. An example of a directional light is when a distant planet is lit by the apparently parallel lines of light from its sun. Light in a downward direction will light the top of an object.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/lights/lights_introduction#the-directional-light)

## Example

<ExampleWrapper>
  <DirectionalLightStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import LightGizmo from 'svelte-babylon/components/Gizmos/LightGizmo/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Color3 } from '@babylonjs/core/Maths/math.color'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
	import type { Writable } from 'svelte/types/runtime/store'

	let intensity = 0.5
	let diffuseHex = '#ffffff'
	let specularHex = '#ffffff'

	let box: Writable<Mesh>

	let shadowObjects: Array<Mesh>
	$: {
		const temp: typeof shadowObjects = []
		if ($box) {
			temp.push($box)
		}
		shadowObjects = temp
	}

	$: specular = Color3.FromHexString(specularHex)
	$: diffuse = Color3.FromHexString(diffuseHex)
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene>
		<DirectionalLight
			{intensity}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
			castShadowOf={shadowObjects}
			{specular}
			{diffuse}
		>
			<LightGizmo />
		</DirectionalLight>
		<ArcRotateCamera target={new Vector3(0, 3, 0)} />
		<Box y={3} bind:object={box} />
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
```

## HemisphericLight

A hemispheric light is an easy way to simulate an ambient environment light. A hemispheric light is defined by a direction, usually 'up' towards the sky. However it is by setting the color properties that the full effect is achieved.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/lights/lights_introduction#the-hemispheric-light)

## Example

<ExampleWrapper>
  <HemisphericLightStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import LightGizmo from 'svelte-babylon/components/Gizmos/LightGizmo/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import { Color3 } from '@babylonjs/core/Maths/math.color'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	let intensity = 0.5
	let diffuseHex = '#ffffff'
	let specularHex = '#ffffff'

	$: specular = Color3.FromHexString(specularHex)
	$: diffuse = Color3.FromHexString(diffuseHex)
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<HemisphericLight {intensity} {specular} {diffuse}>
		<LightGizmo />
	</HemisphericLight>
	<ArcRotateCamera target={new Vector3(0, 3, 0)} />
	<Box y={3} />
	<Ground options={{ width: 6, height: 6, subdivisions: 2 }} y={1} />
</Canvas>
```

## PointLight

A point light is a light defined by an unique point in world space. The light is emitted in every direction from this point. A good example of a point light is a standard light bulb.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/lights/lights_introduction#the-point-light)

## Example

<ExampleWrapper>
  <PointLightStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import LightGizmo from 'svelte-babylon/components/Gizmos/LightGizmo/index.svelte'
	import PointLight from 'svelte-babylon/components/Lights/PointLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import { Color3 } from '@babylonjs/core/Maths/math.color'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
	import type { Writable } from 'svelte/types/runtime/store'

	let intensity = 0.5
	let diffuseHex = '#ffffff'
	let specularHex = '#ffffff'

	let box: Writable<Mesh>

	let shadowObjects: Array<Mesh>
	$: {
		const temp: typeof shadowObjects = []
		if ($box) {
			temp.push($box)
		}
		shadowObjects = temp
	}

	$: specular = Color3.FromHexString(specularHex)
	$: diffuse = Color3.FromHexString(diffuseHex)
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<PointLight
		{intensity}
		position={new Vector3(2, 6, 2)}
		castShadowOf={shadowObjects}
		{specular}
		{diffuse}
	>
		<LightGizmo />
	</PointLight>
	<ArcRotateCamera target={new Vector3(0, 3, 0)} />
	<Box y={3} bind:object={box} />
	<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
</Canvas>
```

## SpotLight

A spot light is defined by a position, a direction, an angle, and an exponent. These values define a cone of light starting from the position, emitting toward the direction.

The angle, in radians, defines the size (field of illumination) of the spotlight's conical beam , and the exponent defines the speed of the decay of the light with distance (reach).

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/lights/lights_introduction#the-spot-light)

## Example

<ExampleWrapper>
  <SpotLightStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import LightGizmo from 'svelte-babylon/components/Gizmos/LightGizmo/index.svelte'
	import SpotLight from 'svelte-babylon/components/Lights/SpotLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import { Color3 } from '@babylonjs/core/Maths/math.color'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
	import type { Writable } from 'svelte/types/runtime/store'

	let intensity = 0.5
	let diffuseHex = '#ffffff'
	let specularHex = '#ffffff'

	let box: Writable<Mesh>

	let shadowObjects: Array<Mesh>
	$: {
		const temp: typeof shadowObjects = []
		if ($box) {
			temp.push($box)
		}
		shadowObjects = temp
	}

	$: specular = Color3.FromHexString(specularHex)
	$: diffuse = Color3.FromHexString(diffuseHex)
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<SpotLight
		{intensity}
		direction={new Vector3(-10, -20, -10)}
		position={new Vector3(2, 6, 2)}
		castShadowOf={shadowObjects}
		{specular}
		{diffuse}
	>
		<LightGizmo />
	</SpotLight>
	<ArcRotateCamera target={new Vector3(0, 3, 0)} />
	<Box y={3} bind:object={box} />
	<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
</Canvas>
```
