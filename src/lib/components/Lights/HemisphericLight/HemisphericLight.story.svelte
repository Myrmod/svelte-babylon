<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import LightGizmo from '$lib/components/Gizmos/LightGizmo/index.svelte'
	import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
	import Box from '$lib/components/Objects/Box/index.svelte'
	import Ground from '$lib/components/Objects/Ground/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
	import { Color3 } from '@babylonjs/core/Maths/math.color'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	let intensity = 0.5
	let diffuseHex = '#ffffff'
	let specularHex = '#ffffff'

	$: specular = Color3.FromHexString(specularHex)
	$: diffuse = Color3.FromHexString(diffuseHex)
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene>
		<HemisphericLight {intensity} {specular} {diffuse}>
			<LightGizmo />
		</HemisphericLight>
		<ArcRotateCamera target={new Vector3(0, 3, 0)} />
		<Box y={3} />
		<Ground options={{ width: 6, height: 6, subdivisions: 2 }} y={1} />
	</Scene>
</Canvas>
