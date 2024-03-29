<script lang="ts">
	import type {
		AbstractMesh,
		TransformNode as BTransformNode,
		Engine,
		InstancedMesh,
	} from '@babylonjs/core'
	import { Animation } from '@babylonjs/core/Animations/animation.js'
	// this import is required for the rotation to work
	import '@babylonjs/core/Behaviors/Meshes/pointerDragBehavior.js'
	import type { ArcRotateCamera as ACamera } from '@babylonjs/core/Cameras/arcRotateCamera'
	import { PointerEventTypes } from '@babylonjs/core/Events/pointerEvents.js'
	import { Color3 } from '@babylonjs/core/Maths/math.color.js'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector.js'
	import type { Scene as BScene } from '@babylonjs/core/scene.js'
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import StandardMaterial from 'svelte-babylon/components/Materials/StandardMaterial/index.svelte'
	import Instance from 'svelte-babylon/components/Misc/Instance/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Plane from 'svelte-babylon/components/Objects/Plane/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import TransformNode from 'svelte-babylon/components/TransformNode/index.svelte'
	import degreeToRadians from 'svelte-babylon/utils/Math/degreeToRadians'
	import type { Writable } from 'svelte/types/runtime/store'

	let width = 3
	let scene: Writable<BScene>
	let transformNode: Writable<BTransformNode>
	let camera: Writable<ACamera>
	let engine: Writable<Engine>
	let cubeWidth = 1
	let centerOfCube = Vector3.Zero()

	const planeDetailsArray = [
		{
			color: new Color3(1, 1, 1), // white
			rotation: new Vector3(Math.PI / 2, 0, 0),
			normal: new Vector3(0, 1, 0),
		},
		{
			color: new Color3(1, 0, 0), // red
			rotation: new Vector3(-Math.PI / 2, 0, 0),
			normal: new Vector3(0, -1, 0),
		},
		{
			color: new Color3(0, 1, 0), // green
			rotation: new Vector3(0, -Math.PI / 2, 0),
			normal: new Vector3(1, 0, 0),
		},
		{
			color: new Color3(0, 0, 1), // blue
			rotation: new Vector3(0, Math.PI / 2, 0),
			normal: new Vector3(-1, 0, 0),
		},
		{
			color: new Color3(1, 120 / 255, 180 / 255), // rosé
			rotation: new Vector3(Math.PI, 0, 0),
			normal: new Vector3(0, 0, 1),
		},
		{
			color: new Color3(200 / 255 / 255, 200 / 255, 1), // cyan
			rotation: new Vector3(0, 0, 0),
			normal: new Vector3(0, 0, -1),
		},
	]

	let cubes: Array<InstancedMesh> = []
	function handleBoxInstanceCreation(instance: InstancedMesh, _index: number) {
		if (cubes.length === Math.pow(width, 3)) {
			return
		}

		cubes = [...cubes, instance]
	}

	function handlePlaneInstanceCreation(
		instance: InstancedMesh,
		index: number,
		planeDetails: (typeof planeDetailsArray)[0],
		cube: InstancedMesh,
	) {
		instance.isPickable = true
		instance.parent = cube
		instance.name = `${cube.name}-Plane-${index}`
		instance.position = planeDetails.normal.scale(0.501).clone()
		instance.rotation = planeDetails.rotation.clone()
		instance.renderOutline = true
	}

	// position our instances
	$: if (cubes.length === Math.pow(width, 3)) {
		let counter = 0
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < width; y++) {
				for (let z = 0; z < width; z++) {
					cubes[counter].position = new Vector3(x, y, z)
					cubes[counter].setParent(null)
					counter++
				}
			}
		}

		centerOfCube = cubes
			.reduce((total, cube) => total.addInPlace(cube.position), Vector3.Zero())
			.scale(1 / cubes.length)
	}

	let eventAdded = false
	let firstPick: AbstractMesh = undefined
	let startPoint = {
		x: 0,
		y: 0,
	}
	let endPoint = {
		x: 0,
		y: 0,
	}
	$: if ($scene && !eventAdded) {
		eventAdded = true
		$scene.onPointerObservable.add(eventData => {
			switch (eventData.type) {
				case PointerEventTypes.POINTERDOWN:
					startPoint.x = eventData.event.clientX
					startPoint.y = eventData.event.clientY

					firstPick = $scene.pick($scene.pointerX, $scene.pointerY).pickedMesh
					if (firstPick) $camera.detachControl()
					break

				case PointerEventTypes.POINTERUP:
					if (!firstPick?.parent) return

					endPoint.x = eventData.event.clientX
					endPoint.y = eventData.event.clientY

					if (
						Math.abs(startPoint.x - endPoint.x) <= 10 &&
						Math.abs(startPoint.y - endPoint.y) <= 10
					)
						return

					const movementVector = getMovementVector(startPoint, endPoint)

					const cubesToRotate = getCubesToRotate(firstPick.parent as AbstractMesh, movementVector)

					// set temporary parent
					cubesToRotate?.forEach(cube => {
						cube.setParent($transformNode)
					})

					const from = movementVector.x ? $transformNode.rotation.y : $transformNode.rotation.x
					const to = from + degreeToRadians(90 * (movementVector.x * -1 || movementVector.y))
					Animation.CreateAndStartAnimation(
						'rotate',
						$transformNode,
						movementVector.x ? 'rotation.y' : 'rotation.x',
						60,
						15,
						from,
						to,
						0,
					).onAnimationEnd = () => {
						cubesToRotate?.forEach(cube => {
							cube.setParent(null)
						})

						firstPick = null
						$camera.attachControl()
					}

					break
				default:
					break
			}
		})
	}

	function getMovementVector(
		start: { x: number; y: number },
		end: { x: number; y: number },
	): Vector3 {
		if (Math.abs(start.y - end.y) > Math.abs(start.x - end.x)) {
			return start.y - end.y < 0 ? Vector3.Down() : Vector3.Up()
		}

		return start.x - end.x > 0 ? Vector3.Left() : Vector3.Right()
	}

	function getCubesToRotate(base: AbstractMesh, direction: Vector3) {
		try {
			if (direction.x) {
				return cubes.filter(cube => cube.position.y === base.position.y)
			}

			return cubes.filter(cube => cube.position.x === base.position.x)
		} catch (error) {}
	}

	function findCubesByPlaneDetails(planeDetails: (typeof planeDetailsArray)[0]) {
		return cubes.filter(
			cube => !cubes.some(ocube => ocube.position.equals(cube.position.add(planeDetails.normal))),
		)
	}
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
	bind:engine
>
	<Scene bind:scene clearColor={Color3.White()} animationsEnabled>
		<HemisphericLight />
		<ArcRotateCamera bind:camera radius={10} target={centerOfCube} alpha={Math.PI / 2} />
		<TransformNode bind:object={transformNode} position={centerOfCube}>
			{#if cubes.length === Math.pow(width, 3)}
				{#each planeDetailsArray as planeDetails}
					<Plane options={{ size: 0.96 }}>
						<StandardMaterial diffuseColor={planeDetails.color} specularColor={Color3.Black()} />
						{#each findCubesByPlaneDetails(planeDetails) as cube}
							<Instance
								onCreated={(instance, index) =>
									handlePlaneInstanceCreation(instance, index, planeDetails, cube)}
							/>
						{/each}
					</Plane>
				{/each}
			{/if}
			<!-- we position the box far away (out of rendering range) to hide it, this way we don't -->
			<Box position={new Vector3(-9999, -9999, -9999)} options={{ size: cubeWidth }}>
				<StandardMaterial diffuseColor={Color3.Black()} specularColor={Color3.Black()} />
				<Instance number={Math.pow(width, 3)} onCreated={handleBoxInstanceCreation} />
			</Box>
		</TransformNode>
	</Scene>
</Canvas>
