<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import GUI from '$lib/components/GUI/index.svelte'
	import TextBlock from '$lib/components/GUI/TextBlock/index.svelte'
	import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
	import Box from '$lib/components/Objects/Box/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	const text = 'Hello Svelte-Babylon'
	const color = '#ffffff'
	const fontSize = 24
	const fontFamily = 'Arial'
	const fontStyle = 'normal'
	const fontWeight = '600'
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
		<Box />
		<GUI>
			<TextBlock {text} {color} {fontSize} {fontFamily} {fontStyle} {fontWeight} />
		</GUI>
	</Scene>
</Canvas>
