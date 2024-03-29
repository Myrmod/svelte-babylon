---
title: Textures
description: This represents a texture in babylon. It can be easily loaded from a network, base64 or html input. Textures require a Material as parent component.
---

<script>
  import StandardTextureStory from 'svelte-babylon/components/Textures/StandardTexture/StandardTexture.story.svelte'
  import TextTextureStory from 'svelte-babylon/components/Textures/TextTexture/TextTexture.story.svelte'
  import ExampleWrapper from '$routes/docs/_components/ExampleWrapper.svelte'
</script>

This represents a texture in babylon. It can be easily loaded from a network, base64 or html input. Textures require a Material as parent component.

[BabylonJS reference](https://doc.babylonjs.com/typedoc/classes/babylon.texture)

## StandardTexture

This texture allows us to place images onto objects.

[BabylonJS reference](https://doc.babylonjs.com/typedoc/classes/babylon.texture)

### Example

<ExampleWrapper>
  <StandardTextureStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import StandardMaterial from 'svelte-babylon/components/Materials/StandardMaterial/index.svelte'
	import Plane from 'svelte-babylon/components/Objects/Plane/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import StandardTexture from 'svelte-babylon/components/Textures/StandardTexture/index.svelte'
	import { Color3 } from '@babylonjs/core/Maths/math.color'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	let ambientHex = '#000000'
	let diffuseHex = '#666666'
	let emissiveHex = '#666666'
	let specularHex = '#ffffff'
	let roughness = 1
	let separateCullingPass = false
	let invertNormalMapX = false
	let invertNormalMapY = false
	let invertRefractionY = false
	let backfaceCulling = false

	$: ambient = Color3.FromHexString(ambientHex)
	$: diffuse = Color3.FromHexString(diffuseHex)
	$: emissive = Color3.FromHexString(emissiveHex)
	$: specular = Color3.FromHexString(specularHex)

	// texture
	let diffuseTexture = true
	let specularTexture = true
	let aoTexture = true
	let normalTexture = true
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
			intensity={0.5}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
		/>
		<ArcRotateCamera target={Vector3.Zero()} radius={2} />
		<Plane>
			<StandardMaterial
				ambientColor={ambient}
				diffuseColor={diffuse}
				emissiveColor={emissive}
				specularColor={specular}
				{roughness}
				{separateCullingPass}
				{invertNormalMapX}
				{invertNormalMapY}
				{invertRefractionY}
				{backfaceCulling}
			>
				{#if diffuseTexture}
					<StandardTexture
						url="/assets/textures/metal/metal_diffuse.jpg"
						uScale={2}
						vScale={2}
						textureTarget="diffuseTexture"
					/>
				{/if}
				{#if specularTexture}
					<StandardTexture
						url="/assets/textures/metal/metal_specular.jpg"
						uScale={2}
						vScale={2}
						textureTarget="specularTexture"
					/>
				{/if}
				{#if aoTexture}
					<StandardTexture
						url="/assets/textures/metal/metal_ao.jpg"
						uScale={2}
						vScale={2}
						textureTarget="ambientTexture"
					/>
				{/if}
				{#if normalTexture}
					<StandardTexture
						url="/assets/textures/metal/metal_normal.jpg"
						uScale={2}
						vScale={2}
						textureTarget="bumpTexture"
					/>
				{/if}
			</StandardMaterial>
		</Plane>
	</Scene>
</Canvas>
```

## DynamicTexture

This texture allows us to place more complex things like text onto objects. It works by creating a canvas onto which you can draw using all the facilities of the HTML5 Canvas.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/materials/using/dynamicTexture)

## VideoTexture

If you want to display a video in your scene, the Babylon engine has a special texture for that, which has been implemented in the VideoTexture component. This special texture works similar to other textures, with the exception of a few parameters. These parameters include video urls (an url array), the size of the video texture (here is 256), the scene, and a final optional boolean that indicates if you want to use mipmap or not.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/materials/using/videoTexture)

## TextTexture

### Example

<ExampleWrapper>
  <TextTextureStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import TextPlane from 'svelte-babylon/prebuilds/TextPlane/index.svelte'

	const text = 'TextTexture'
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
