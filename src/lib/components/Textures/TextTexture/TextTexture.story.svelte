<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
	import TextPlane from '$lib/prebuilds/TextPlane/index.svelte'

	const text = 'TextTexture'
	const width = 16 / 5.2
	const height = 9 / 5.2
	const backgroundColor = '#ffffff'
	const color = '#000000'
	const fontSizeMultiplier = 1
	const sizeMultiplier = 60
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
		<ArcRotateCamera radius={5} beta={1} />
		<TextPlane
			{text}
			planeOptions={{ width, height }}
			{backgroundColor}
			{color}
			{fontSizeMultiplier}
			{sizeMultiplier}
		/>
	</Scene>
</Canvas>
