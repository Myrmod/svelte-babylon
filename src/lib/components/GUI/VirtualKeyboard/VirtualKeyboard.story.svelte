<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import GUI from '$lib/components/GUI/index.svelte'
	import TextBlock from '$lib/components/GUI/TextBlock/index.svelte'
	import VirtualKeyboard from '$lib/components/GUI/VirtualKeyboard/index.svelte'
	import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	let text = 'Hello VirtualKeyboard'
	function handleKeyboardInput({ detail }: { detail: string }) {
		if (detail === '\u2190') {
			text = text.substring(0, text.length - 1)
			return
		}
		text = text + detail
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
		/>
		<ArcRotateCamera />
		<GUI>
			<TextBlock {text} />
			<VirtualKeyboard
				on:keyPress={handleKeyboardInput}
				defaultButtonBackground="darkred"
				keyRows={[
					['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '\u2190'],
					{ vals: ['a', 'b'], propertySets: [null, { width: '200px' }] },
				]}
			/>
		</GUI>
	</Scene>
</Canvas>
