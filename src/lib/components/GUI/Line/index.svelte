<script lang="ts">
	import type { Vector2 } from '@babylonjs/core/Maths/math.vector'
	import type { EventState } from '@babylonjs/core/Misc/observable'
	import type { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js'
	import type { Control } from '@babylonjs/gui/2D/controls/control'
	import type { Grid } from '@babylonjs/gui/2D/controls/grid'
	import { Line } from '@babylonjs/gui/2D/controls/line.js'
	import type { Vector2WithInfo } from '@babylonjs/gui/2D/math2D'
	import { getContext, onDestroy, onMount } from 'svelte'
	import type { Writable } from 'svelte/store'

	export let name = 'Line'
	export let width: number | string = 1
	export let height: number | string = 1
	export let color: Line['color'] = 'white'
	/**
	 * width in pixel
	 */
	export let lineWidth = 1
	export let top: Line['top'] = 0
	export let left: Line['left'] = 0
	export let start: [number, number]
	export let end: [number, number]
	export let dash: Array<number> = []

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
	export let guiElement = new Line(name)

	onMount(() => {
		try {
			if (grid) {
				$grid.addControl(guiElement, row, column)
			} else {
				$parent.addControl(guiElement)
			}
		} catch (error) {
			console.error(error)
		}
	})

	onDestroy(() => {
		if (grid) {
			$grid.removeControl(guiElement)
		} else {
			$parent.removeControl(guiElement)
		}
		guiElement.dispose()
	})

	export let onPointerUp: (eventData: Vector2WithInfo, eventState: EventState) => void = undefined
	$: if (onPointerUp) {
		guiElement.onPointerUpObservable.add(onPointerUp)
	}
	export let onPointerDown: (eventData: Vector2WithInfo, eventState: EventState) => void = undefined
	$: if (onPointerDown) {
		guiElement.onPointerDownObservable.add(onPointerUp)
	}
	export let onPointerClick: (eventData: Vector2WithInfo, eventState: EventState) => void =
		undefined
	$: if (onPointerClick) {
		guiElement.onPointerClickObservable.add(onPointerUp)
	}
	export let onPointerEnter: (eventData: Control, eventState: EventState) => void = undefined
	$: if (onPointerEnter) {
		guiElement.onPointerEnterObservable.add(onPointerEnter)
	}
	export let onPointerOut: (eventData: Control, eventState: EventState) => void = undefined
	$: if (onPointerOut) {
		guiElement.onPointerOutObservable.add(onPointerOut)
	}
	export let onPointerMove: (eventData: Vector2, eventState: EventState) => void = undefined
	$: if (onPointerMove) {
		guiElement.onPointerMoveObservable.add(onPointerMove)
	}

	$: if (guiElement) {
		guiElement.color = color
		guiElement.name = name
		guiElement.width = width
		guiElement.height = height
		guiElement.top = top
		guiElement.left = left
		guiElement.lineWidth = lineWidth
		guiElement.x1 = start[0]
		guiElement.y1 = start[1]
		guiElement.x2 = end[0]
		guiElement.y2 = end[1]
		guiElement.dash = dash
	}
</script>
