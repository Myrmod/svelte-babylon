<script lang="ts">
	import type { Vector2 } from '@babylonjs/core/Maths/math.vector'
	import type { EventState } from '@babylonjs/core/Misc/observable'
	import type { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js'
	import { Button } from '@babylonjs/gui/2D/controls/button.js'
	import type { Control } from '@babylonjs/gui/2D/controls/control'
	import type { Grid } from '@babylonjs/gui/2D/controls/grid'
	import type { Vector2WithInfo } from '@babylonjs/gui/2D/math2D'
	import { getContext, onDestroy, onMount } from 'svelte'
	import type { Writable } from 'svelte/store'

	export let name = 'Button'
	export let text = 'Click Me'
	export let width: Button['width'] = '150px'
	export let height: Button['height'] = '40px'
	export let color: Button['color'] = 'white'
	export let cornerRadius: Button['cornerRadius'] = 20
	export let background: Button['background'] = 'green'
	export let paddingBottom: Button['paddingBottom'] = '0px'
	export let paddingTop: Button['paddingTop'] = '0px'
	export let paddingLeft: Button['paddingLeft'] = '0px'
	export let paddingRight: Button['paddingRight'] = '0px'
	export let top: Button['top'] = 0
	export let left: Button['left'] = 0

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

	export let guiElement = Button.CreateSimpleButton(name, text)

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
		guiElement.name = name
		guiElement.width = width
		guiElement.height = height
		guiElement.color = color
		guiElement.cornerRadius = cornerRadius
		guiElement.background = background
		guiElement.textBlock.text = text
		guiElement.paddingBottom = paddingBottom
		guiElement.paddingTop = paddingTop
		guiElement.paddingLeft = paddingLeft
		guiElement.paddingRight = paddingRight
		guiElement.top = top
		guiElement.left = left
	}
</script>
