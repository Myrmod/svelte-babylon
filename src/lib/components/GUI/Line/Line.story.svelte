<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import GUI from '$lib/components/GUI/index.svelte'
	import Line from '$lib/components/GUI/Line/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
</script>

<Canvas>
	<Scene>
		<ArcRotateCamera />
		<GUI>
			<Line start={[10, 10]} end={[1000, 500]} dash={[5, 10]} />
		</GUI>
	</Scene>
</Canvas>
