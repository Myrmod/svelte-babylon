<script lang="ts">
	import type { Vector2 } from '@babylonjs/core/Maths/math.vector'
	import type { EventState } from '@babylonjs/core/Misc/observable'
	import type { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js'
	import type { Control } from '@babylonjs/gui/2D/controls/control'
	import { Ellipse } from '@babylonjs/gui/2D/controls/ellipse.js'
	import type { Grid } from '@babylonjs/gui/2D/controls/grid'
	import type { Vector2WithInfo } from '@babylonjs/gui/2D/math2D'
	import { getContext, onDestroy, onMount } from 'svelte'
	import type { Writable } from 'svelte/store'

	export let name = 'Ellipse'
	export let width: number | string = 1
	export let height: number | string = 1
	export let background: Ellipse['background'] = 'black'
	export let color: Ellipse['color'] = 'white'
	export let thickness = 1
	export let paddingBottom: Ellipse['paddingBottom'] = '0px'
	export let paddingTop: Ellipse['paddingTop'] = '0px'
	export let paddingLeft: Ellipse['paddingLeft'] = '0px'
	export let paddingRight: Ellipse['paddingRight'] = '0px'
	export let top: Ellipse['top'] = 0
	export let left: Ellipse['left'] = 0

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
	export let guiElement = new Ellipse(name)

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
		guiElement.background = background
		guiElement.name = name
		guiElement.width = width
		guiElement.height = height
		guiElement.paddingBottom = paddingBottom
		guiElement.paddingTop = paddingTop
		guiElement.paddingLeft = paddingLeft
		guiElement.paddingRight = paddingRight
		guiElement.top = top
		guiElement.left = left
		guiElement.thickness = thickness
	}
</script>
