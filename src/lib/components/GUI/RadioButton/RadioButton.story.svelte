<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import GUI from '$lib/components/GUI/index.svelte'
	import RadioButton from '$lib/components/GUI/RadioButton/index.svelte'
	import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
	import Box from '$lib/components/Objects/Box/index.svelte'
	import Sphere from '$lib/components/Objects/Sphere/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	let showBox = true
	let showSphere = false
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
		<ArcRotateCamera />
		{#if showBox}
			<Box />
		{/if}
		{#if showSphere}
			<Sphere />
		{/if}
		<GUI>
			<RadioButton width="50px" height="50px" top={60} bind:checked={showSphere} />
			<RadioButton width="50px" height="50px" bind:checked={showBox} />
		</GUI>
	</Scene>
</Canvas>
