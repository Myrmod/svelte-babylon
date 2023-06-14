<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
	import Polygon from '$lib/components/Objects/Polygon/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
	import type { Writable } from 'svelte/store'

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
