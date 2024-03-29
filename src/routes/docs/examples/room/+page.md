---
title: Room
description: It's build according to https://playground.babylonjs.com/#4GBWI5#266. It is planneds to implement an "easy" way to create interconnected rooms.
---

<script>
  import RoomStory from '$examples/Room.story.svelte'
  import ExampleWrapper from '$routes/docs/_components/ExampleWrapper.svelte'
</script>

It's build according to https://playground.babylonjs.com/#4GBWI5#266. It is planneds to implement an "easy" way to create interconnected rooms.

## Example

<ExampleWrapper>
  <RoomStory />
</ExampleWrapper>

## Example Code

```svelte
<script lang="ts">
	import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import { Mesh } from '@babylonjs/core/Meshes/mesh.js'
	import { VertexData } from '@babylonjs/core/Meshes/mesh.vertexData'
	import type { Scene as BScene } from '@babylonjs/core/scene.js'
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import type { Writable } from 'svelte/types/runtime/store'

	let scene: Writable<BScene>
	/**
	 * This thing is called a footprint. A footprint is a sequence of consecutive corners in counter clockwise order. Each corner is a Vector3 in the form (x, y, 0)
	 */
	const baseData = [-5, 0, 5, 0, 5, 6, 2, 6, 2, 9, -5, 9]

	/**
	 * This represents the width of the walls
	 */
	const ply = 0.3

	/**
	 * This represents the height of the walls
	 */
	const height = 5

	const corners = []
	for (let b = 0; b < baseData.length / 2; b++) {
		corners.push(corner(baseData[2 * b], baseData[2 * b + 1]))
	}

	const walls = []
	for (let c = 0; c < corners.length; c++) {
		walls.push(new wall(corners[c]))
	}

	$: if ($scene) {
		buildFromPlan(walls, ply, height)
	}

	function corner(x: number, z: number) {
		return new Vector3(x, 0, z)
	}
	function wall(corner: Vector3) {
		this.corner = corner
	}
	function buildFromPlan(walls: string | any[], ply: number, height: any) {
		const outerData = []
		let angle = 0
		let direction = 0
		let line = Vector3.Zero()
		walls[1].corner.subtractToRef(walls[0].corner, line)
		let nextLine = Vector3.Zero()
		walls[2].corner.subtractToRef(walls[1].corner, nextLine)
		let nbWalls = walls.length

		for (let w = 0; w <= nbWalls; w++) {
			angle = Math.acos(Vector3.Dot(line, nextLine) / (line.length() * nextLine.length()))
			direction = Vector3.Cross(nextLine, line).normalize().y
			let lineNormal = new Vector3(line.z, 0, -1 * line.x).normalize()
			line.normalize()
			outerData[(w + 1) % nbWalls] = walls[(w + 1) % nbWalls].corner
				.add(lineNormal.scale(ply))
				.add(line.scale((direction * ply) / Math.tan(angle / 2)))
			line = nextLine.clone()
			walls[(w + 3) % nbWalls].corner.subtractToRef(walls[(w + 2) % nbWalls].corner, nextLine)
		}

		const positions = []
		const indices = []

		for (let w = 0; w < nbWalls; w++) {
			positions.push(walls[w].corner.x, walls[w].corner.y, walls[w].corner.z) // inner corners base
		}

		for (let w = 0; w < nbWalls; w++) {
			positions.push(outerData[w].x, outerData[w].y, outerData[w].z) // outer corners base
		}

		for (let w = 0; w < nbWalls; w++) {
			indices.push(
				w,
				(w + 1) % nbWalls,
				nbWalls + ((w + 1) % nbWalls),
				w,
				nbWalls + ((w + 1) % nbWalls),
				w + nbWalls,
			) // base indices
		}

		let currentLength = positions.length // inner and outer top corners
		for (let w = 0; w < currentLength / 3; w++) {
			positions.push(positions[3 * w])
			positions.push(height)
			positions.push(positions[3 * w + 2])
		}

		currentLength = indices.length
		for (let i = 0; i < currentLength / 3; i++) {
			indices.push(
				indices[3 * i + 2] + 2 * nbWalls,
				indices[3 * i + 1] + 2 * nbWalls,
				indices[3 * i] + 2 * nbWalls,
			) // top indices
		}

		for (let w = 0; w < nbWalls; w++) {
			indices.push(
				w,
				w + 2 * nbWalls,
				((w + 1) % nbWalls) + 2 * nbWalls,
				w,
				((w + 1) % nbWalls) + 2 * nbWalls,
				(w + 1) % nbWalls,
			) // inner wall indices
			indices.push(
				((w + 1) % nbWalls) + 3 * nbWalls,
				w + 3 * nbWalls,
				w + nbWalls,
				((w + 1) % nbWalls) + nbWalls,
				((w + 1) % nbWalls) + 3 * nbWalls,
				w + nbWalls,
			) // outer wall indices
		}

		const normals = []
		const uvs = []

		VertexData.ComputeNormals(positions, indices, normals)
		VertexData._ComputeSides(Mesh.FRONTSIDE, positions, indices, normals, uvs)

		//Create a custom mesh
		const customMesh = new Mesh('custom', $scene)
		customMesh.material = new StandardMaterial(`custom-material`, $scene)

		//Create a vertexData object
		const vertexData = new VertexData()

		//Assign positions and indices to vertexData
		vertexData.positions = positions
		vertexData.indices = indices
		vertexData.normals = normals
		vertexData.uvs = uvs

		//Apply vertexData to custom mesh
		vertexData.applyToMesh(customMesh)

		return customMesh
	}
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene bind:scene>
		<HemisphericLight direction={new Vector3(5, 10, 0)} />
		<ArcRotateCamera target={new Vector3(0, 0, 4.5)} radius={20} beta={Math.PI / 4} />
	</Scene>
</Canvas>
```
