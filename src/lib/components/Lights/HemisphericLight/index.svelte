<script lang="ts">
	import { createReactiveContext } from '$lib/utils/createReactiveContext'
	import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight.js'
	import { Color3 } from '@babylonjs/core/Maths/math.color'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import type { Scene } from '@babylonjs/core/scene.js'
	import { getContext, onDestroy } from 'svelte'
	import type { Writable } from 'svelte/store'

	const scene = getContext<Writable<Scene>>('scene')

	export let name: string = 'HemisphericLight'
	export let diffuse: Color3 = Color3.White()
	export let specular: Color3 = Color3.White()
	export let direction = Vector3.Zero()
	export let groundColor = Color3.Black()
	// export let excludeWithLayerMask = undefined
	// export let falloffType: Light = undefined
	export let intensity = 1
	// export let intensityMode = undefined
	// export let radius = undefined
	// export let range = 100
	export let shadowEnabled = false
	export const light = createReactiveContext('light', new HemisphericLight(name, direction, $scene))

	onDestroy(() => {
		$light.dispose()
	})

	$: if ($light) {
		$light.diffuse = diffuse
		$light.specular = specular
		$light.groundColor = groundColor

		// $light.excludeWithLayerMask = excludeWithLayerMask
		// $light.falloffType = falloffType
		$light.intensity = intensity
		// $light.intensityMode = intensityMode
		// $light.radius = radius
		// $light.range = range
		$light.shadowEnabled = shadowEnabled
	}
</script>

<slot />
