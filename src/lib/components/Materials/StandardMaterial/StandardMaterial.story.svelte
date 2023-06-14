<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
	import StandardMaterial from '$lib/components/Materials/StandardMaterial/index.svelte'
	import Plane from '$lib/components/Objects/Plane/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
	import { Color3 } from '@babylonjs/core/Maths/math.color'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	let ambientHex = '#000000'
	let diffuseHex = '#0000ff'
	let emissiveHex = '#666666'
	let specularHex = '#ffffff'
	let roughness = 1
	let separateCullingPass = false
	let invertNormalMapX = false
	let invertNormalMapY = false
	let invertRefractionY = false
	let backfaceCulling = false

	$: ambient = Color3.FromHexString(ambientHex)
	$: diffuse = Color3.FromHexString(diffuseHex)
	$: emissive = Color3.FromHexString(emissiveHex)
	$: specular = Color3.FromHexString(specularHex)
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
		<DirectionalLight
			intensity={0.5}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
		/>
		<ArcRotateCamera target={Vector3.Zero()} />
		<Plane>
			<StandardMaterial
				ambientColor={ambient}
				diffuseColor={diffuse}
				emissiveColor={emissive}
				specularColor={specular}
				{roughness}
				{separateCullingPass}
				{invertNormalMapX}
				{invertNormalMapY}
				{invertRefractionY}
				{backfaceCulling}
			/>
		</Plane>
	</Scene>
</Canvas>
