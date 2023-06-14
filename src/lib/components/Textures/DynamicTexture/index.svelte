<!-- @component
The DynamicTexture can be used for creating more complex textures.
It can be used to apply text to a material. This is used in the TextPlane component.
-->
<script lang="ts">
	import { createReactiveContext } from '$lib/utils/createReactiveContext'
	import { Engine } from '@babylonjs/core/Engines/engine.js'
	import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js'
	import { DynamicTexture } from '@babylonjs/core/Materials/Textures/dynamicTexture.js'
	import { Texture } from '@babylonjs/core/Materials/Textures/texture.js'
	import type { Scene } from '@babylonjs/core/scene'
	import { getContext, onDestroy, onMount } from 'svelte'
	import type { Writable } from 'svelte/types/runtime/store'

	const scene = getContext<Writable<Scene>>('scene')
	const parent = getContext<Writable<StandardMaterial>>('material')

	if (!($parent instanceof StandardMaterial)) {
		throw new Error('StandardTexture requires a parent of StandardMaterial')
	}

	export let name = 'DynamicTexture'
	export let options: Record<string, unknown> = {}
	export let generateMipMaps = false
	export let samplingMode = Texture.TRILINEAR_SAMPLINGMODE
	export let format = Engine.TEXTUREFORMAT_RGBA
	export let invertY = false
	export let textureTarget:
		| 'ambientTexture'
		| 'bumpTexture'
		| 'diffuseTexture'
		| 'emissiveTexture'
		| 'lightmapTexture'
		| 'opacityTexture'
		| 'reflectionTexture'
		| 'refractionTexture'
		| 'specularTexture' = 'diffuseTexture'

	export const texture = createReactiveContext(
		'texture',
		new DynamicTexture(
			`${name}-Texture`,
			options,
			$scene,
			generateMipMaps,
			samplingMode,
			format,
			invertY,
		),
	)

	onMount(() => {
		$parent[textureTarget] = $texture
	})

	onDestroy(() => {
		$parent[textureTarget] = null
		$texture.dispose()
	})
</script>

<slot />
