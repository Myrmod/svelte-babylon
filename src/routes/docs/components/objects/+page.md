---
title: Objects
description: Objects are the basic building blocks of your scene. They can be either imported from eg. .gbl files or created using the existing primitives.
---

<script>
  import BoxStory from 'svelte-babylon/components/Objects/Box/Box.story.svelte'
  import CapsuleStory from 'svelte-babylon/components/Objects/Capsule/Capsule.story.svelte'
  import CustomStory from 'svelte-babylon/components/Objects/Custom/Custom.story.svelte'
  import CylinderStory from 'svelte-babylon/components/Objects/Cylinder/Cylinder.story.svelte'
  import DashedLinesStory from 'svelte-babylon/components/Objects/DashedLines/DashedLines.story.svelte'
  import DecalStory from 'svelte-babylon/components/Objects/Decal/Decal.story.svelte'
  import DiscStory from 'svelte-babylon/components/Objects/Disc/Disc.story.svelte'
  import GroundStory from 'svelte-babylon/components/Objects/Ground/Ground.story.svelte'
  import GroundFromHeightMapStory from 'svelte-babylon/components/Objects/GroundFromHeightMap/GroundFromHeightMap.story.svelte'
  import HexSphereStory from 'svelte-babylon/components/Objects/HexSphere/HexSphere.story.svelte'
  import IcoSphereStory from 'svelte-babylon/components/Objects/IcoSphere/IcoSphere.story.svelte'
  import LatheStory from 'svelte-babylon/components/Objects/Lathe/Lathe.story.svelte'
  import LinesStory from 'svelte-babylon/components/Objects/Lines/Lines.story.svelte'
  import LineSystemStory from 'svelte-babylon/components/Objects/LineSystem/LineSystem.story.svelte'
  import PhotoDomeStory from 'svelte-babylon/components/Objects/PhotoDome/PhotoDome.story.svelte'
  import PlaneStory from 'svelte-babylon/components/Objects/Plane/Plane.story.svelte'
  import PolygonStory from 'svelte-babylon/components/Objects/Polygon/Polygon.story.svelte'
  import PolyhedronStory from 'svelte-babylon/components/Objects/Polyhedron/Polyhedron.story.svelte'
  import RibbonStory from 'svelte-babylon/components/Objects/Ribbon/Ribbon.story.svelte'
  import SphereStory from 'svelte-babylon/components/Objects/Sphere/Sphere.story.svelte'
  import TiledBoxStory from 'svelte-babylon/components/Objects/TiledBox/TiledBox.story.svelte'
  import TiledGroundStory from 'svelte-babylon/components/Objects/TiledGround/TiledGround.story.svelte'
  import TiledPlaneStory from 'svelte-babylon/components/Objects/TiledPlane/TiledPlane.story.svelte'
  import TorusStory from 'svelte-babylon/components/Objects/Torus/Torus.story.svelte'
  import TorusKnotStory from 'svelte-babylon/components/Objects/TorusKnot/TorusKnot.story.svelte'
  import TubeStory from 'svelte-babylon/components/Objects/Tube/Tube.story.svelte'
  import ExampleWrapper from '$routes/docs/_components/ExampleWrapper.svelte'
</script>

Objects are the basic building blocks of your scene. They can be either imported from eg. .gbl files or created using the existing primitives.

[BabylonJS reference]()

## Box

The Box component allows you to create a simple box of any box shape you like.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/set/box)

### Example

<ExampleWrapper id='BoxStory'>
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

## Capsule

The Capsule component allows you to create a simple capsule of any capsule shape you like.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/set/capsule)

### Example

<ExampleWrapper id='CapsuleStory'>
  <CapsuleStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Capsule from 'svelte-babylon/components/Objects/Capsule/index.svelte'
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
		<Capsule y={3} bind:object />
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
```

## Custom

The Custom component allows you to load you own 3D models to the scene.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/set/capsule)

### Example

<ExampleWrapper id='CustomStory'>
  <CustomStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Custom from 'svelte-babylon/components/Objects/Custom/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
	import type { Writable } from 'svelte/types/runtime/store'

	let model: Writable<Mesh>
	let shadowObjects: Array<Mesh>
	$: if (model) {
		shadowObjects = [$model]
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
		<Custom
			url="/assets/models/logo.glb"
			scaling={new Vector3(5, 5, 5)}
			position={new Vector3(0, 2, 0)}
			receiveShadows
			bind:object={model}
		/>
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
```

## Cylinder

The created cylinder has its flat sides parallel to the xz plane with its origin at the center of the vertical line of symmetry. If you set diameterTop to zero, you get a cone instead of a cylinder, with different values for diameterTop and diameterBottom you get a truncated cone.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/set/cylinder)

### Example

<ExampleWrapper id='CylinderStory'>
  <CylinderStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Cylinder from 'svelte-babylon/components/Objects/Cylinder/index.svelte'
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
		<Cylinder y={3} bind:object />
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
```

## DashedLines

Creates a contiguous series of dashed line segments from a list of points. You must set at least the points option. On update, you must set the points and instance options properties and you should not change . Any other option will not be changed.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/param/dashed)

### Example

<ExampleWrapper id='DashedLinesStory'>
  <DashedLinesStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import DashedLines from 'svelte-babylon/components/Objects/DashedLines/index.svelte'
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
		<DashedLines
			y={3}
			bind:object
			options={{
				points: [
					new Vector3(-2, -1, 0),
					new Vector3(0, 1, 0),
					new Vector3(2, -1, 0),
					new Vector3(3, 2, 0),
				],
				dashSize: 1000,
				gapSize: 500,
				dashNb: 16,
			}}
		/>
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
```

## Decal

These are usually used to add details on meshes (bullets hole, local details, etc...), a decal is a mesh produced from a subset of a previous one with a small offset in order to appear on top of it.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/decals)

### Example

<ExampleWrapper id='DecalStory'>
  <DecalStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import StandardMaterial from 'svelte-babylon/components/Materials/StandardMaterial/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Decal from 'svelte-babylon/components/Objects/Decal/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import type { ActionEvent } from '@babylonjs/core/Actions/actionEvent'
	import { Color3 } from '@babylonjs/core/Maths/math.color'
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

	// handling bullet holes
	let bulletHoles: Array<{
		position: Vector3
	}> = []
	function handlePick(e: ActionEvent) {
		const temp = bulletHoles

		temp.push({
			position: e.additionalData.pickedPoint,
		})
		bulletHoles = temp
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
		<Box y={3} bind:object onPick={handlePick}>
			{#each bulletHoles as hole}
				<Decal
					options={{
						size: new Vector3(0.25, 0.25, 0.25),
						position: hole.position,
					}}
				>
					<StandardMaterial diffuseColor={Color3.Black()} />
				</Decal>
			{/each}
		</Box>
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
```

## Disc

The created disc is a flat surface parallel to the xy plane with its origin at the center of the disc. Disc is a little bit of a misnomer since you can use it to create any kind of regular polygon. The number of sides is dependent on the value given to tessellation. The larger this value the closer to an actual disc. Using the arc option you can create a sector.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/set/disc)

### Example

<ExampleWrapper id='DiscStory'>
  <DiscStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Disc from 'svelte-babylon/components/Objects/Disc/index.svelte'
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
		<Disc y={3} bind:object />
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
```

## Ground

A ground is a flat horizontal plane parallel to the xz plane which can be subdivided into rectangular regions. The origin of the ground is at the center of the plane. The optional properties for determining the size of the ground are width (x) and height (z) (and yes we all agree that depth would be more descriptive than height!)

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/set/ground)

### Example

<ExampleWrapper id='GroundStory'>
  <GroundStory />
</ExampleWrapper>

### Example Code

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

## GroundFromHeightMap

When the ground is created using groundFromHeightMap the surface of the ground can be perturbed by a grayscale image file called a height map. Lighter areas are displayed higher than darker areas. This is a way of creating hills and valleys on your ground.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/set/ground_hmap)

### Example

<ExampleWrapper id='GroundFromHeightMapStory'>
  <GroundFromHeightMapStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import GroundFromHeightMap from 'svelte-babylon/components/Objects/GroundFromHeightMap/index.svelte'
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
		<HemisphericLight intensity={0.5} />
		<DirectionalLight
			intensity={0.25}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
		/>
		<ArcRotateCamera radius={5} />
		<GroundFromHeightMap
			url="/assets/images/heightMap.png"
			options={{ width: 5, height: 5, subdivisions: 500, maxHeight: 1 }}
		/>
	</Scene>
</Canvas>
```

## HexSphere

The HexSphere component is a special implmenentation of a Polyhedron. It has a slightly different API.

### Example

<ExampleWrapper id='HexSphereStory'>
  <HexSphereStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import HexSphere from 'svelte-babylon/components/Objects/HexSphere/index.svelte'
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
		<HexSphere y={3} bind:object />
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
```

## IcoSphere

This a sphere based upon an icosahedron with 20 triangular faces which can be subdivided into smaller triangles.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/polyhedra/icosphere)

### Example

<ExampleWrapper id='IcoSphereStory'>
  <IcoSphereStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import IcoSphere from 'svelte-babylon/components/Objects/IcoSphere/index.svelte'
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
		<IcoSphere y={3} bind:object />
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
```

## Lathe

A lathed shape is created by defining a shape profile using vector3 coordinates in the xy plane. The shape profile will be rotated around the y axis to form the lather shape. It is recommended that all the x values are positive. You must set at least the shape option.

On creation the local origin of a lathed shape is coincident with the world origin. It is not possible to give a position relative to the constructed shape as this depends on the data sets used.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/param/lathe)

### Example

<ExampleWrapper id='LatheStory'>
  <LatheStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import Lathe from 'svelte-babylon/components/Objects/Lathe/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import { Mesh } from '@babylonjs/core/Meshes/mesh.js'

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
		<Lathe
			y={3}
			bind:object
			options={{
				shape: [
					new Vector3(2, 0, 0),
					new Vector3(4, 0, 0),
					new Vector3(4, 1, 0),
					new Vector3(2, 1, 0),
				],
				radius: 0.5,
				tessellation: 6,
				sideOrientation: Mesh.DOUBLESIDE,
			}}
		/>
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
```

## Lines

Lines are created as a contiguous series of attached line segments from a list of points. You must set at least the points option. On update, you must set the points and instance options. You can also update the colors option if previously set at construction time.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/param/lines)

### Example

<ExampleWrapper id='LinesStory'>
  <LinesStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Lines from 'svelte-babylon/components/Objects/Lines/index.svelte'
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
		<HemisphericLight />
		<ArcRotateCamera radius={5} />
		<Lines
			options={{
				points: [
					new Vector3(-2, -1, 0),
					new Vector3(0, 1, 0),
					new Vector3(2, -1, 0),
					new Vector3(3, 2, 0),
				],
			}}
		/>
	</Scene>
</Canvas>
```

## LineSystem

A system of non-contiguous lines that are independent of each other and may exist in their own space. You must set at least the lines option. On update, you must set the lines and instance options. You can also update the colors option if previously set at construction time.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/param/line_system)

### Example

<ExampleWrapper id='LineSystemStory'>
  <LineSystemStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import LineSystem from 'svelte-babylon/components/Objects/LineSystem/index.svelte'
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
		<HemisphericLight />
		<ArcRotateCamera target={new Vector3(5, 3, 3)} alpha={Math.PI / 4} radius={20} />
		<LineSystem
			options={{
				lines: [
					[new Vector3(0, 0, 10), new Vector3(10, 0, 10)],
					[new Vector3(10, 0, 0), new Vector3(10, 10, 0), new Vector3(0, 10, 0)],
				],
			}}
		/>
	</Scene>
</Canvas>
```

## PhotoDome

The PhotoDome component is an implementation of the BabylonJS 360 Photo Dome. It allows you to set a background for your scene.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/environment/360PhotoDome)

### Example

<ExampleWrapper id='PhotoDomeStory'>
  <PhotoDomeStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import PhotoDome from 'svelte-babylon/components/Objects/PhotoDome/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
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
		<ArcRotateCamera radius={10} beta={-1} />
		<Box />
		<PhotoDome url="/assets/images/photosphere.jpg" />
	</Scene>
</Canvas>
```

## Plane

The created plane is a flat surface parallel to the xy plane with its origin at the center of the plane.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/set/plane)

### Example

<ExampleWrapper id='PlaneStory'>
  <PlaneStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import Plane from 'svelte-babylon/components/Objects/Plane/index.svelte'
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
		<Plane y={3} bind:object />
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
```

## Polygon

The Polygon component lets you create a polygon of any realistic form and shape. It even allows holes.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/param/polyMeshBuilder)

### Example

<ExampleWrapper id='PolygonStory'>
  <PolygonStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Polygon from 'svelte-babylon/components/Objects/Polygon/index.svelte'
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
		<ArcRotateCamera target={new Vector3(0, 0, 0)} radius={10} />
		<Polygon
			bind:object
			options={{
				shape: [
					new Vector3(2, 0, -2),
					new Vector3(2, 0, 0),
					new Vector3(3, 0, 2),
					new Vector3(1, 0, 2),
					new Vector3(-3, 0, 3),
					new Vector3(-3, 0, 1),
					new Vector3(-2, 0, -2),
					new Vector3(-2, 0, -3),
					new Vector3(2, 0, -3),
				],
				holes: [
					[
						new Vector3(1, 0, -1),
						new Vector3(1.5, 0, 0),
						new Vector3(1.4, 0, 1),
						new Vector3(0.5, 0, 1.5),
					],
				],
				depth: 2,
			}}
		/>
	</Scene>
</Canvas>
```

## Polyhedron

There are a multitude of polyhedra, too many for all to be created by individual names. Often their names take too long anyway and Babylon.js provides 15 common ones via number. There are many beyond these 15 and those can be created from custom data sets provided in the form of Playground examples.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/polyhedra)

### Example

<ExampleWrapper id='PolyhedronStory'>
  <PolyhedronStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import Polyhedron from 'svelte-babylon/components/Objects/Polyhedron/index.svelte'
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
		<Polyhedron y={3} bind:object />
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
```

## Ribbon

The ribbon is a very versatile shape. Picture a ribbon in the real world with parallel wires running down its length. You can turn such a ribbon into a wide variety of shapes. Joining one long edge to its opposite you could form a tube and bend that into different shapes. This and more is possible with a Babylon.js ribbon. Instead of parallel wires a Babylon.js ribbon is formed from paths defined by an array of vector3s and how you define the paths determines the final shape.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/param/ribbon)

### Example

<ExampleWrapper id='RibbonStory'>
  <RibbonStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Ribbon from 'svelte-babylon/components/Objects/Ribbon/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import { Mesh } from '@babylonjs/core/Meshes/mesh.js'
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
		<ArcRotateCamera target={new Vector3(0, 3, 0)} radius={20} alpha={Math.PI / 4} />
		<Ribbon
			bind:object
			options={{
				pathArray: [
					[
						new Vector3(5, 0, 0),
						new Vector3(4.5, 1, 0),
						new Vector3(4, 2, 0),
						new Vector3(3.5, 3, 0),
						new Vector3(3, 4, 0),
					],
					[
						new Vector3(0, 0, -5),
						new Vector3(0, 0.5, -7),
						new Vector3(0, 1, -9),
						new Vector3(0, 1.5, -11),
						new Vector3(0, 2, -13),
					],
					[
						new Vector3(-5, 0, 0),
						new Vector3(-4.5, 1, 0),
						new Vector3(-4.0, 2, 0),
						new Vector3(-3.5, 3, 0),
						new Vector3(-3, 4, 0),
					],
				],
				sideOrientation: Mesh.DOUBLESIDE,
			}}
		/>
	</Scene>
</Canvas>
```

## Sphere

The created sphere has its origin at the center of the sphere. By using different values for diameterX, diameterY and diameterZ\_ lead you create an ellipsoid.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/set/sphere)

### Example

<ExampleWrapper id='SphereStory'>
  <SphereStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import Sphere from 'svelte-babylon/components/Objects/Sphere/index.svelte'
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
		<Sphere y={3} bind:object />
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
```

## TiledBox

A tiled box is constructed from six tiled planes s o that he tile size, pattern and alignment of tiles will be the same for each face. Using the faceUV array each side can have a different texture for its tiles as explained for a standard box.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/set/tiled_box)

### Example

<ExampleWrapper id='TiledBoxStory'>
  <TiledBoxStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import StandardMaterial from 'svelte-babylon/components/Materials/StandardMaterial/index.svelte'
	import TiledBox from 'svelte-babylon/components/Objects/TiledBox/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import StandardTexture from 'svelte-babylon/components/Textures/StandardTexture/index.svelte'
	import { Color3 } from '@babylonjs/core/Maths/math.color.js'
	import { Mesh } from '@babylonjs/core/Meshes/mesh.js'
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene clearColor={Color3.Gray()}>
		<HemisphericLight />
		<ArcRotateCamera alpha={1.8} radius={3} />
		<TiledBox
			options={{
				sideOrientation: Mesh.DOUBLESIDE,
				pattern: Mesh.NO_FLIP,
				width: 1,
				height: 1,
				tileSize: 0.5,
				tileWidth: 0.5,
			}}
		>
			<StandardMaterial>
				<StandardTexture url="/svelte-babylon-icon.png" textureTarget="diffuseTexture" />
				<StandardTexture url="/svelte-babylon-icon.png" textureTarget="specularTexture" />
			</StandardMaterial>
		</TiledBox>
	</Scene>
</Canvas>
```

## TiledGround

A tiled ground is created differently to a ground mesh. It still lies in the xz plane. The bottom left corner of of the tiled ground is given by the values for xmin and zmin and the top right corner by xmax and zmax. The tiled ground is be subdivided into tile regions: across into w tiles and up into h tiles. In the same way every tile can be further subdivided into w by h sections. The creation of a tiled ground relies on the use of MultiMaterials.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/set/tiled_ground)

### Example

<ExampleWrapper id='TiledGroundStory'>
  <TiledGroundStory />
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
	<Scene clearColor={Color3.Gray()}>
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

## TiledPlane

The tile size, pattern and alignment of tiles can be set.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/set/tiled_plane)

### Example

<ExampleWrapper id='TiledPlaneStory'>
  <TiledPlaneStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import StandardMaterial from 'svelte-babylon/components/Materials/StandardMaterial/index.svelte'
	import TiledPlane from 'svelte-babylon/components/Objects/TiledPlane/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import StandardTexture from 'svelte-babylon/components/Textures/StandardTexture/index.svelte'
	import { Color3 } from '@babylonjs/core/Maths/math.color.js'
	import { Mesh } from '@babylonjs/core/Meshes/mesh.js'
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene clearColor={Color3.Gray()}>
		<HemisphericLight />
		<ArcRotateCamera alpha={1.8} radius={3} />
		<TiledPlane
			options={{
				sideOrientation: Mesh.DOUBLESIDE,
				pattern: Mesh.NO_FLIP,
				width: 2,
				height: 2,
				tileSize: 1,
				tileWidth: 1,
			}}
		>
			<StandardMaterial>
				<StandardTexture url="/svelte-babylon-icon.png" textureTarget="diffuseTexture" />
				<StandardTexture url="/svelte-babylon-icon.png" textureTarget="specularTexture" />
			</StandardMaterial>
		</TiledPlane>
	</Scene>
</Canvas>
```

## Torus

The created torus (doughnut shape) has its origin at the center of the torus. You can control its diameter and the thickness of its circular body.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/set/torus)

### Example

<ExampleWrapper id='TorusStory'>
  <TorusStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import Torus from 'svelte-babylon/components/Objects/Torus/index.svelte'
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
		<Torus y={3} bind:object />
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
```

## TorusKnot

A torus knot is a continuous shape that twists and turns around the surface of a torus. The number of twists and turns are determined by two windings integers p and q. The simplest knotted knot is with 2 and 3 for p and q. The origin of the created torus knot is at the center of the underlying torus.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/set/torus_knot)

### Example

<ExampleWrapper id='TorusKnotStory'>
  <TorusKnotStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import TorusKnot from 'svelte-babylon/components/Objects/TorusKnot/index.svelte'
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
		<HemisphericLight intensity={0.5} />
		<DirectionalLight
			intensity={0.25}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
		/>
		<ArcRotateCamera target={Vector3.Zero()} radius={10} />
		<TorusKnot />
	</Scene>
</Canvas>
```

## Tube

A tube is much as you would expect it to be, a surface with hollow length.
On creation the local origin of a tube is coincident with the world origin. It is not possible to give a position relative to the constructed shape as this depends on the data sets used.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/creation/param/tube)

### Example

<ExampleWrapper id='TubeStory'>
  <TubeStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import Tube from 'svelte-babylon/components/Objects/Tube/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import { Mesh } from '@babylonjs/core/Meshes/mesh.js'
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
		<ArcRotateCamera target={new Vector3(0, 3, 0)} radius={10} />
		<Tube
			y={3}
			bind:object
			options={{
				path: [new Vector3(2.5, 0, 0), new Vector3(0, 1, 0.1), new Vector3(-2, 3, 0.1)],
				radius: 0.5,
				sideOrientation: Mesh.DOUBLESIDE,
			}}
		/>
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
```
