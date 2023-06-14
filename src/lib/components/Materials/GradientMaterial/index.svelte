<script lang="ts">
	import { createReactiveContext } from '$lib/utils/createReactiveContext'
	import type { MultiMaterial } from '@babylonjs/core/Materials/multiMaterial.js'
	import { Color3 } from '@babylonjs/core/Maths/math.color'
	import type { Mesh } from '@babylonjs/core/Meshes/mesh'
	import type { Scene } from '@babylonjs/core/scene'
	import { GradientMaterial } from '@babylonjs/materials/gradient/gradientMaterial.js'
	import { getContext, onDestroy, onMount } from 'svelte'
	import type { Writable } from 'svelte/types/runtime/store'

	const scene = getContext<Writable<Scene>>('scene')

	export let name: string = 'GradientMaterial'
	export let separateCullingPass = false
	export let backfaceCulling = false
	export let topColor = Color3.Black()
	export let topColorAlpha = 1
	export let bottomColor = Color3.White()
	export let bottomColorAlpha = 1
	export let offset = 0.5
	export let smoothness = 1
	export let disableLighting = false
	export let disableColorWrite = false
	export let disableDepthWrite = false

	export const material = createReactiveContext('material', new GradientMaterial(name, $scene))

	const parent = getContext<Writable<Mesh>>('object')
	export let multiMaterial = getContext<Writable<MultiMaterial>>('MultiMaterial')

	onMount(() => {
		try {
			if ($multiMaterial) {
				$multiMaterial.subMaterials = [...$multiMaterial.subMaterials, $material]

				return
			}

			$parent.material = $material
		} catch (error) {
			console.error(error)
		}
	})

	onDestroy(() => {
		$material.dispose()
		$parent.material = null
	})

	$: if ($material) {
		$material.separateCullingPass = separateCullingPass
		$material.backFaceCulling = backfaceCulling
		$material.topColor = topColor
		$material.topColorAlpha = topColorAlpha
		$material.bottomColor = bottomColor
		$material.bottomColorAlpha = bottomColorAlpha
		$material.offset = offset
		$material.smoothness = smoothness
		$material.disableLighting = disableLighting
		$material.disableColorWrite = disableColorWrite
		$material.disableDepthWrite = disableDepthWrite
	}
</script>

<slot />
