---
title: Materials
description: Materials allow you to cover your meshes in color and texture. How a material appears depends on the light or lights used in the scene and how it is set to react.
---

<script>
  import StandardMaterialStory from 'svelte-babylon/components/Materials/StandardMaterial/StandardMaterial.story.svelte'
  import MultiMaterialStory from 'svelte-babylon/components/Materials/MultiMaterial/MultiMaterial.story.svelte'
  import GradientMaterialStory from 'svelte-babylon/components/Materials/GradientMaterial/GradientMaterial.story.svelte'
  import ExampleWrapper from '$routes/docs/_components/ExampleWrapper.svelte'
</script>

Materials allow you to cover your meshes in color and texture. How a material appears depends on the light or lights used in the scene and how it is set to react.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/materials/using/materials_introduction)

## StandardMaterial

This is the default material used in Babylon. It is the best trade off between quality
and performances.

[BabylonJS reference](https://doc.babylonjs.com/typedoc/classes/babylon.standardmaterial)

### Example

<ExampleWrapper>
  <StandardMaterialStory />
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
	import { Color3 } from '@babylonjs/core/Maths/math.color'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	let ambientHex = '#000000'
	let diffuseHex = '#0000ff'
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
		<DirectionalLight
			intensity={0.5}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
		/>
		<ArcRotateCamera target={Vector3.Zero()} />
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
			/>
		</Plane>
	</Scene>
</Canvas>
```

## MultiMaterial

A multi-material is used to apply different materials to different parts of the same object. Currently there is only one preset for the `renderAs` property defined called `chessboard`. If you want something else you currently need to write your own setup with the `on:updateMultiMaterial` action. This event will be activated if you have set either a non existent `renderAs` type or `renderAs` with the value of `custom`. It triggers if the material or the child `Materials` are changed.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/materials/using/multiMaterials)

### Example

<ExampleWrapper>
  <MultiMaterialStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import MultiMaterial from 'svelte-babylon/components/Materials/MultiMaterial/index.svelte'
	import StandardMaterial from 'svelte-babylon/components/Materials/StandardMaterial/index.svelte'
	import TiledGround from 'svelte-babylon/components/Objects/TiledGround/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Color3 } from '@babylonjs/core/Maths/math.color'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	const gridOptions = {
		h: 8,
		w: 8,
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
		<HemisphericLight intensity={0.25} />
		<DirectionalLight
			intensity={0.5}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
		/>
		<ArcRotateCamera target={Vector3.Zero()} radius={5} beta={1} />
		<TiledGround
			options={{
				xmin: -3,
				zmin: -3,
				xmax: 3,
				zmax: 3,
				subdivisions: gridOptions,
			}}
		>
			<MultiMaterial renderAs="chessboard" options={{ grid: gridOptions }}>
				<StandardMaterial diffuseColor={Color3.White()} />
				<StandardMaterial diffuseColor={Color3.Black()} />
			</MultiMaterial>
		</TiledGround>
	</Scene>
</Canvas>
```

## GradientMaterial

A GradientMaterial creates a material with a smoot gradient between two colors.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/materials/using/multiMaterials)

### Example

<ExampleWrapper>
  <GradientMaterialStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import GradientMaterial from 'svelte-babylon/components/Materials/GradientMaterial/index.svelte'
	import Sphere from 'svelte-babylon/components/Objects/Sphere/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Color3 } from '@babylonjs/core/Maths/math.color.js'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector.js'
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
		<DirectionalLight
			intensity={0.5}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
		/>
		<ArcRotateCamera target={Vector3.Zero()} radius={5} />
		<Sphere>
			<GradientMaterial topColor={Color3.Blue()} bottomColor={Color3.Yellow()} />
		</Sphere>
	</Scene>
</Canvas>
```
