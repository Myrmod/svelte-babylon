<!-- @component
The TextTexture can be used to write text on an object.
It is used in the TextPlane component.
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
	export let options: {
		width: number
		height?: number
	} = {
		width: 1,
	}
	export let generateMipMaps = false
	export let samplingMode = Texture.TRILINEAR_SAMPLINGMODE
	export let format = Engine.TEXTUREFORMAT_RGBA
	export let invertY = false
	export let text = 'No Text'
	export let fontFamily = 'Arial'
	export let textOffsetX: number = null
	export let textOffsetY: number = null
	/**
	 * color string eg '#000000'
	 */
	export let color = '#000000'
	/**
	 * color string eg '#ffffff'
	 */
	export let backgroundColor = '#ffffff'
	export let fontSizeMultiplier = 1
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

	// draws the text
	let invalidated = true
	$: if (invalidated && $parent[textureTarget]) {
		const dtContext = $texture.getContext()
		const size = 12
		dtContext.font = `${size}px ${fontFamily}`
		const textWidth = dtContext.measureText(text).width
		const ratio = textWidth / size
		const fontSize = Math.floor(options.width / (ratio * fontSizeMultiplier))
		const font = `${fontSize}px ${fontFamily}`

		$texture.drawText(text, textOffsetX, textOffsetY, font, color, backgroundColor, true)
		invalidated = false
	}
</script>

<slot />
