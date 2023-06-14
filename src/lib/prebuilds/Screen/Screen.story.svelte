<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
	import Box from '$lib/components/Objects/Box/index.svelte'
	import Ground from '$lib/components/Objects/Ground/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
	import Screen from '$lib/prebuilds/Screen/index.svelte'
	import type { ArcRotateCamera as ACamera } from '@babylonjs/core/Cameras/arcRotateCamera.js'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
	import type { Scene as BScene } from '@babylonjs/core/scene'
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

	let scene: Writable<BScene>
	let addedOnBeforeRenderObservable = false
	$: if (object && $scene && !addedOnBeforeRenderObservable) {
		$scene.onBeforeRenderObservable.add(() => {
			$object.rotate(Vector3.Up(), 0.01)
		})
		addedOnBeforeRenderObservable = true
	}

	let mainCamera: Writable<ACamera>
	let showScreen = true
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene bind:scene>
		<HemisphericLight intensity={0.5} />
		<DirectionalLight
			intensity={0.25}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
			castShadowOf={shadowObjects}
		/>
		<ArcRotateCamera target={new Vector3(0, 3, 0)} bind:camera={mainCamera} />
		<Box y={3} bind:object />
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} receiveShadows y={1} />
		{#if showScreen}
			<Screen />
		{/if}
	</Scene>
</Canvas>
