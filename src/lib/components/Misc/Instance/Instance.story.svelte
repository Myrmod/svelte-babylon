<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
	import Instance from '$lib/components/Misc/Instance/index.svelte'
	import Box from '$lib/components/Objects/Box/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
	import type { InstancedMesh } from '@babylonjs/core'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	function handleInstanceCreation(instance: InstancedMesh) {
		const randomPosition = () => Math.random() * 10 * (Math.round(Math.random()) ? 1 : -1)
		instance.position = new Vector3(randomPosition(), randomPosition(), randomPosition())
	}
</script>

<Canvas antialiasing>
	<Scene>
		<HemisphericLight intensity={0.5} />
		<DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
		<ArcRotateCamera radius={50} />
		<Box>
			<Instance number={10000} onCreated={handleInstanceCreation} />
		</Box>
	</Scene>
</Canvas>
