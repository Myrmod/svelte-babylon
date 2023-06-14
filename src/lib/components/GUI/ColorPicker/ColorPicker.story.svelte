<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import ColorPicker from '$lib/components/GUI/ColorPicker/index.svelte'
	import GUI from '$lib/components/GUI/index.svelte'
	import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
	import StandardMaterial from '$lib/components/Materials/StandardMaterial/index.svelte'
	import Box from '$lib/components/Objects/Box/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
	import { Color3 } from '@babylonjs/core'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	let color = Color3.Gray()
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
		<Box>
			<StandardMaterial diffuseColor={color} />
		</Box>
		<GUI>
			<ColorPicker bind:color />
		</GUI>
	</Scene>
</Canvas>
