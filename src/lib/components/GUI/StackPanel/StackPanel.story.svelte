<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import Ellipse from '$lib/components/GUI/Ellipse/index.svelte'
	import Image from '$lib/components/GUI/Image/index.svelte'
	import GUI from '$lib/components/GUI/index.svelte'
	import Rectangle from '$lib/components/GUI/Rectangle/index.svelte'
	import StackPanel from '$lib/components/GUI/StackPanel/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
</script>

<Canvas>
	<Scene>
		<ArcRotateCamera />
		<GUI>
			<StackPanel width="100px">
				<Image src="/svelte-babylon-logo.png" width="100px" height="100px" />
				<Ellipse width="100px" height="100px" background="blue" color="blue" />
				<Rectangle width="100px" height="100px" background="green" color="green" />
			</StackPanel>
		</GUI>
	</Scene>
</Canvas>
