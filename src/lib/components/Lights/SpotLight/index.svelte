<script lang="ts">
	import { createReactiveContext } from '$lib/utils/createReactiveContext'
	import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator.js'
	import { SpotLight } from '@babylonjs/core/Lights/spotLight.js'
	import { Color3 } from '@babylonjs/core/Maths/math.color'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
	import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
	import type { Scene } from '@babylonjs/core/scene.js'
	import { getContext, onDestroy } from 'svelte'
	import type { Writable } from 'svelte/types/runtime/store'

	const scene = getContext<Writable<Scene>>('scene')

	export let name: string = 'SpotLight'
	export let direction = Vector3.Zero()
	export let angle = Math.PI / 2 // 90deg
	export let exponent = 10
	export let intensity = 1
	export let diffuse: Color3 = Color3.White()
	export let specular: Color3 = Color3.White()
	export let position = Vector3.Zero()
	export let x: number = undefined
	export let y: number = undefined
	export let z: number = undefined
	export let shadowMaxZ = undefined
	export let shadowMinZ = undefined

	// shadow
	export let castShadowOf: Array<Mesh | AbstractMesh> = undefined

	/**
	 * @link https://doc.babylonjs.com/divingDeeper/lights/shadows#exponential-shadow-map
	 */
	export let useExponentialShadowMap = false
	/**
	 * @link https://doc.babylonjs.com/divingDeeper/lights/shadows#poisson-sampling
	 */
	export let usePoissonSampling = false
	/**
	 * @link https://doc.babylonjs.com/divingDeeper/lights/shadows#blur-exponential-shadow-map
	 */
	export let useBlurExponentialShadowMap = false

	export const light = createReactiveContext(
		'light',
		new SpotLight(name, position, direction, angle, exponent, $scene),
	)

	onDestroy(() => {
		$light.dispose()

		if (shadowGenerator) {
			shadowGenerator.dispose()
		}
	})

	$: if ($light) {
		$light.intensity = intensity
		$light.diffuse = diffuse
		$light.specular = specular
		$light.position.x = x || position.x
		$light.position.y = y || position.y
		$light.position.z = z || position.z
		$light.shadowMaxZ = shadowMaxZ
		$light.shadowMinZ = shadowMinZ
	}

	let shadowGenerator: ShadowGenerator
	$: initShadows(castShadowOf)

	async function initShadows(meshes: Array<Mesh | AbstractMesh>) {
		try {
			if (!meshes?.length) return
			await import('@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent')

			if (!shadowGenerator) {
				shadowGenerator = new ShadowGenerator(1024, $light)
			}
			if (shadowGenerator) {
				castShadowOf
					.filter(i => i)
					.forEach(mesh => {
						shadowGenerator?.addShadowCaster(mesh)
					})

				shadowGenerator.useExponentialShadowMap = useExponentialShadowMap
				shadowGenerator.usePoissonSampling = usePoissonSampling
				shadowGenerator.useBlurExponentialShadowMap = useBlurExponentialShadowMap
			}
		} catch (error) {
			console.error(error)
		}
	}
</script>

<slot />
