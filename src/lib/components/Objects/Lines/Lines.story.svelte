<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
	import Lines from '$lib/components/Objects/Lines/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
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
		<ArcRotateCamera radius={5} />
		<Lines
			options={{
				points: [
					new Vector3(-2, -1, 0),
					new Vector3(0, 1, 0),
					new Vector3(2, -1, 0),
					new Vector3(3, 2, 0),
				],
			}}
		/>
	</Scene>
</Canvas>
