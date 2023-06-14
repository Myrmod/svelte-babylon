<script lang="ts">
	import { createReactiveContext } from '$lib/utils/createReactiveContext'
	import type { Vector2 } from '@babylonjs/core/Maths/math.vector'
	import type { EventState } from '@babylonjs/core/Misc/observable'
	import type { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js'
	import type { Control } from '@babylonjs/gui/2D/controls/control'
	import { Grid } from '@babylonjs/gui/2D/controls/grid.js'
	import type { Vector2WithInfo } from '@babylonjs/gui/2D/math2D'
	import { getContext, onDestroy, onMount } from 'svelte'
	import type { Writable } from 'svelte/store'

	export let name = 'Grid'
	/**
	 * Defines the color of the grid background
	 */
	export let background = 'Black'
	export let width: number | string = 1
	export let height: number | string = 1
	export let paddingBottom: Grid['paddingBottom'] = '0px'
	export let paddingTop: Grid['paddingTop'] = '0px'
	export let paddingLeft: Grid['paddingLeft'] = '0px'
	export let paddingRight: Grid['paddingRight'] = '0px'
	export let top: Grid['top'] = 0
	export let left: Grid['left'] = 0
	export let columnDefinitions: Array<number | { width: number; isPixel: boolean }>
	export let rowDefinitions: Array<number | { width: number; isPixel: boolean }>

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
	export let guiElement = createReactiveContext('grid', new Grid(name))

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
		$guiElement.background = background
		$guiElement.height = height
		$guiElement.left = left
		$guiElement.name = name
		$guiElement.paddingBottom = paddingBottom
		$guiElement.paddingLeft = paddingLeft
		$guiElement.paddingRight = paddingRight
		$guiElement.paddingTop = paddingTop
		$guiElement.top = top
		$guiElement.width = width
	}

	$: if ($guiElement) {
		columnDefinitions.forEach((definition, _index) => {
			// if ($guiElement.getColumnDefinition(index)) {
			//   if (typeof definition === 'number') {
			//     $guiElement.setColumnDefinition(index, definition)
			//   } else {
			//     $guiElement.setColumnDefinition(index, definition.width, definition.isPixel)
			//   }

			//   return
			// }
			if (typeof definition === 'number') {
				$guiElement.addColumnDefinition(definition)
			} else {
				$guiElement.addColumnDefinition(definition.width, definition.isPixel)
			}
		})
	}

	$: if ($guiElement) {
		rowDefinitions.forEach((definition, _index) => {
			// if ($guiElement.getRowDefinition(index)) {
			//   if (typeof definition === 'number') {
			//     $guiElement.setRowDefinition(index, definition)
			//   } else {
			//     $guiElement.setRowDefinition(index, definition.width, definition.isPixel)
			//   }

			//   return
			// }
			if (typeof definition === 'number') {
				$guiElement.addRowDefinition(definition)
			} else {
				$guiElement.addRowDefinition(definition.width, definition.isPixel)
			}
		})
	}
</script>

<slot />
