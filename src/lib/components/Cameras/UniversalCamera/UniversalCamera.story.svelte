<script lang="ts">
	import UniversalCamera from '$lib/components/Cameras/UniversalCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
	import Box from '$lib/components/Objects/Box/index.svelte'
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
		<HemisphericLight intensity={0.25} />
		<DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
		<UniversalCamera position={new Vector3(0, 0, -10)} />
		<Box />
	</Scene>
</Canvas>
