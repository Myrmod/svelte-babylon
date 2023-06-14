<script lang="ts" context="module">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
	import Skybox from '$lib/prebuilds/Skybox/index.svelte'
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
		<ArcRotateCamera />
		<Skybox rootUrl="/assets/textures/skybox/sky" />
	</Scene>
</Canvas>
