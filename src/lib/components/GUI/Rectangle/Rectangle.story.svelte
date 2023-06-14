<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import GUI from '$lib/components/GUI/index.svelte'
	import Rectangle from '$lib/components/GUI/Rectangle/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
</script>

<Canvas>
	<Scene>
		<ArcRotateCamera />
		<GUI>
			<Rectangle
				width="400px"
				height="400px"
				background="blue"
				color="yellow"
				thickness={4}
				cornerRadius={10}
			/>
		</GUI>
	</Scene>
</Canvas>
