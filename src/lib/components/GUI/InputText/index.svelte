<script lang="ts">
	import type { Vector2 } from '@babylonjs/core/Maths/math.vector'
	import type { EventState } from '@babylonjs/core/Misc/observable'
	import type { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js'
	import type { Control } from '@babylonjs/gui/2D/controls/control'
	import type { Grid } from '@babylonjs/gui/2D/controls/grid'
	import { InputText } from '@babylonjs/gui/2D/controls/inputText.js'
	import type { Vector2WithInfo } from '@babylonjs/gui/2D/math2D'
	import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte'
	import type { Writable } from 'svelte/store'

	const dispatch = createEventDispatcher()

	export let name = 'InputText'
	export let text = ''
	export let color: InputText['color'] = 'white'
	export let fontSize: InputText['fontSize'] = 24
	export let fontFamily: InputText['fontFamily'] = 'Arial'
	export let fontStyle: InputText['fontStyle'] = 'normal'
	export let fontWeight: InputText['fontWeight'] = '600'
	export let fontSizeInPixels: InputText['fontSizeInPixels'] = undefined
	export let fontOffset: InputText['fontOffset'] = undefined
	export let paddingBottom: InputText['paddingBottom'] = '0px'
	export let paddingTop: InputText['paddingTop'] = '0px'
	export let paddingLeft: InputText['paddingLeft'] = '0px'
	export let paddingRight: InputText['paddingRight'] = '0px'
	export let top: InputText['top'] = 0
	export let left: InputText['left'] = 0
	export let maxWidth: number | string = undefined
	export let width: number | string = undefined
	export let height: number | string = undefined
	export let value = ''

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

	export let guiElement = new InputText(name, text)

	onMount(() => {
		try {
			if (grid) {
				$grid.addControl(guiElement, row, column)
			} else {
				$parent.addControl(guiElement)
			}
			if (value) {
				guiElement.text = value
			}
			guiElement.onTextChangedObservable.add(input => {
				value = input.text
				dispatch('change', value)
			})
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
		guiElement.fontFamily = fontFamily
		guiElement.fontOffset = fontOffset
		guiElement.fontSize = fontSize
		guiElement.fontSizeInPixels = fontSizeInPixels
		guiElement.fontStyle = fontStyle
		guiElement.fontWeight = fontWeight
		guiElement.name = name
		guiElement.text = text
		guiElement.paddingBottom = paddingBottom
		guiElement.paddingTop = paddingTop
		guiElement.paddingLeft = paddingLeft
		guiElement.paddingRight = paddingRight
		guiElement.top = top
		guiElement.left = left
		if (maxWidth) guiElement.maxWidth = maxWidth
		if (width) guiElement.width = width
		if (height) guiElement.height = height
	}
</script>
