<script lang="ts">
	import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from '$lib/components/Canvas/index.svelte'
	import DirectionalLight from '$lib/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from '$lib/components/Lights/HemisphericLight/index.svelte'
	import StandardMaterial from '$lib/components/Materials/StandardMaterial/index.svelte'
	import Plane from '$lib/components/Objects/Plane/index.svelte'
	import Scene from '$lib/components/Scene/index.svelte'
	import StandardTexture from '$lib/components/Textures/StandardTexture/index.svelte'
	import { Color3 } from '@babylonjs/core/Maths/math.color'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	let ambientHex = '#000000'
	let diffuseHex = '#666666'
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

	// texture
	let diffuseTexture = true
	let specularTexture = true
	let aoTexture = true
	let normalTexture = true
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene>
		<HemisphericLight intensity={0.5} />
		<DirectionalLight
			intensity={0.5}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
		/>
		<ArcRotateCamera target={Vector3.Zero()} radius={2} />
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
			>
				{#if diffuseTexture}
					<StandardTexture
						url="/assets/textures/metal/metal_diffuse.jpg"
						uScale={2}
						vScale={2}
						textureTarget="diffuseTexture"
					/>
				{/if}
				{#if specularTexture}
					<StandardTexture
						url="/assets/textures/metal/metal_specular.jpg"
						uScale={2}
						vScale={2}
						textureTarget="specularTexture"
					/>
				{/if}
				{#if aoTexture}
					<StandardTexture
						url="/assets/textures/metal/metal_ao.jpg"
						uScale={2}
						vScale={2}
						textureTarget="ambientTexture"
					/>
				{/if}
				{#if normalTexture}
					<StandardTexture
						url="/assets/textures/metal/metal_normal.jpg"
						uScale={2}
						vScale={2}
						textureTarget="bumpTexture"
					/>
				{/if}
			</StandardMaterial>
		</Plane>
	</Scene>
</Canvas>
