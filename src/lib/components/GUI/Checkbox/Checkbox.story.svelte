<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import Checkbox from '$lib/components/GUI/Checkbox/index.svelte'
	import GUI from '$lib/components/GUI/index.svelte'
	import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
	import Box from '$lib/components/Objects/Box/index.svelte'
	import Sphere from '$lib/components/Objects/Sphere/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	const color = '#ffffff'
	let showBox = true
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
		{:else}
			<Sphere />
		{/if}
		<GUI>
			<Checkbox {color} width="50px" height="50px" on:change={() => (showBox = !showBox)} />
		</GUI>
	</Scene>
</Canvas>
