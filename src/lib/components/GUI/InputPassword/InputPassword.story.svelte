<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import GUI from '$lib/components/GUI/index.svelte'
	import InputPassword from '$lib/components/GUI/InputPassword/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'

	let value: string
	$: if (value) {
		console.log(value)
	}
</script>

<Canvas>
	<Scene>
		<ArcRotateCamera />
		<GUI>
			<InputPassword bind:value width="100px" height="30px" />
		</GUI>
	</Scene>
</Canvas>
