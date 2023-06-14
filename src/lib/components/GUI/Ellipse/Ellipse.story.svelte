<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import Ellipse from '$lib/components/GUI/Ellipse/index.svelte'
	import GUI from '$lib/components/GUI/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
</script>

<Canvas>
	<Scene>
		<ArcRotateCamera />
		<GUI>
			<Ellipse width="400px" height="400px" background="blue" color="yellow" thickness={4} />
		</GUI>
	</Scene>
</Canvas>
