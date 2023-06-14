<script lang="ts">
	import { createReactiveContext } from '$lib/utils/createReactiveContext'
	import type { Vector2 } from '@babylonjs/core/Maths/math.vector'
	import type { EventState } from '@babylonjs/core/Misc/observable'
	import type { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js'
	import type { Control } from '@babylonjs/gui/2D/controls/control'
	import type { Grid } from '@babylonjs/gui/2D/controls/grid'
	import { ScrollViewer } from '@babylonjs/gui/2D/controls/scrollViewers/scrollViewer.js'
	import type { Vector2WithInfo } from '@babylonjs/gui/2D/math2D'
	import { getContext, onDestroy, onMount } from 'svelte'
	import type { Writable } from 'svelte/store'

	export let name = 'ScrollViewer'
	export let fontSize: ScrollViewer['fontSize'] = 24
	export let fontFamily: ScrollViewer['fontFamily'] = 'Arial'
	export let fontStyle: ScrollViewer['fontStyle'] = 'normal'
	export let fontWeight: ScrollViewer['fontWeight'] = '600'
	export let fontSizeInPixels: ScrollViewer['fontSizeInPixels'] = undefined
	export let fontOffset: ScrollViewer['fontOffset'] = undefined
	export let paddingBottom: ScrollViewer['paddingBottom'] = '0px'
	export let paddingTop: ScrollViewer['paddingTop'] = '0px'
	export let paddingLeft: ScrollViewer['paddingLeft'] = '0px'
	export let paddingRight: ScrollViewer['paddingRight'] = '0px'
	export let top: ScrollViewer['top'] = 0
	export let left: ScrollViewer['left'] = 0
	export let width: number | string = 1
	export let height: number | string = 1
	/**
	 * Foreground color of the scroll bar and color of the thumb
	 */
	export let barColor = 'grey'
	/**
	 * Background color of the scroll bar and bottom right square
	 */
	export let barBackground = 'transparent'
	/**
	 * 	Proportion of thumb compared to scroll bar length (0 to 0.9)
	 */
	export let thumbLength = 0.5
	/**
	 * Height of scroll bar in px
	 */
	export let barSize = 20

	const parent = getContext<Writable<AdvancedDynamicTexture>>('gui')
	const grid = getContext<Writable<Grid>>('grid')
	/**
	 * only applicable if the parent is a Grid
	 */
	export let row = 0
	/**
	 * only applicable if the parent is a Grid
	 */
	export let column = 0
	export let isImageBased = false
	export let guiElement = createReactiveContext('gui', new ScrollViewer(name, isImageBased))

	onMount(() => {
		try {
			if (grid) {
				$grid.addControl($guiElement, row, column)
			} else {
				$parent.addControl($guiElement)
			}
		} catch (error) {
			console.error(error)
		}
	})

	onDestroy(() => {
		if (grid) {
			$grid.removeControl($guiElement)
		} else {
			$parent.removeControl($guiElement)
		}
		$guiElement.dispose()
	})

	export let onPointerUp: (eventData: Vector2WithInfo, eventState: EventState) => void = undefined
	$: if (onPointerUp) {
		$guiElement.onPointerUpObservable.add(onPointerUp)
	}
	export let onPointerDown: (eventData: Vector2WithInfo, eventState: EventState) => void = undefined
	$: if (onPointerDown) {
		$guiElement.onPointerDownObservable.add(onPointerUp)
	}
	export let onPointerClick: (eventData: Vector2WithInfo, eventState: EventState) => void =
		undefined
	$: if (onPointerClick) {
		$guiElement.onPointerClickObservable.add(onPointerUp)
	}
	export let onPointerEnter: (eventData: Control, eventState: EventState) => void = undefined
	$: if (onPointerEnter) {
		$guiElement.onPointerEnterObservable.add(onPointerEnter)
	}
	export let onPointerOut: (eventData: Control, eventState: EventState) => void = undefined
	$: if (onPointerOut) {
		$guiElement.onPointerOutObservable.add(onPointerOut)
	}
	export let onPointerMove: (eventData: Vector2, eventState: EventState) => void = undefined
	$: if (onPointerMove) {
		$guiElement.onPointerMoveObservable.add(onPointerMove)
	}

	$: if ($guiElement) {
		$guiElement.fontFamily = fontFamily
		$guiElement.fontOffset = fontOffset
		$guiElement.fontSize = fontSize
		$guiElement.fontSizeInPixels = fontSizeInPixels
		$guiElement.fontStyle = fontStyle
		$guiElement.fontWeight = fontWeight
		$guiElement.name = name
		$guiElement.paddingBottom = paddingBottom
		$guiElement.paddingTop = paddingTop
		$guiElement.paddingLeft = paddingLeft
		$guiElement.paddingRight = paddingRight
		$guiElement.top = top
		$guiElement.left = left
		$guiElement.barColor = barColor
		$guiElement.barBackground = barBackground
		$guiElement.thumbLength = thumbLength
		$guiElement.barSize = barSize
		$guiElement.width = width
		$guiElement.height = height
	}
</script>

<slot />
