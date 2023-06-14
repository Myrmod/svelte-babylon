<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import Grid from '$lib/components/GUI/Grid/index.svelte'
	import GUI from '$lib/components/GUI/index.svelte'
	import Rectangle from '$lib/components/GUI/Rectangle/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
</script>

<Canvas>
	<Scene>
		<ArcRotateCamera />
		<GUI>
			<Grid
				width="500px"
				height="500px"
				columnDefinitions={[{ width: 100, isPixel: true }, 0.5, 0.5, { width: 100, isPixel: true }]}
				rowDefinitions={[0.5, 0.5]}
				background="beige"
			>
				<Rectangle background="blue" column={0} row={0} />
				<Rectangle background="yellow" column={0} row={1} />
				<Rectangle background="red" column={1} row={1} />
			</Grid>
		</GUI>
	</Scene>
</Canvas>
