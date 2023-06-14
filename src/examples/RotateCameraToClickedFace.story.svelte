<script lang="ts">
	import type { ActionEvent } from '@babylonjs/core/Actions/actionEvent'
	import type { ArcRotateCamera as ACamera } from '@babylonjs/core/Cameras/arcRotateCamera.js'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Ground from 'svelte-babylon/components/Objects/Ground/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import type { Writable } from 'svelte/types/runtime/store'

	let camera: Writable<ACamera>

	let object: Writable<Mesh>

	let shadowObjects: Array<Mesh>
	$: {
		const temp: typeof shadowObjects = []
		if ($object) {
			temp.push($object)
		}
		shadowObjects = temp
	}

	let rotateToFacePickedFace: (
		e: ActionEvent,
		radius?: number,
		fps?: number,
		totalFrames?: number,
		onAnimationEnd?: any,
	) => Promise<void>
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
		<ArcRotateCamera bind:camera target={new Vector3(0, 3, 0)} bind:rotateToFacePickedFace />
		<Box y={3} bind:object onPick={rotateToFacePickedFace} />
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
	</Scene>
</Canvas>
