<script lang="ts">
	import type { Vector2 } from '@babylonjs/core/Maths/math.vector'
	import type { EventState } from '@babylonjs/core/Misc/observable'
	import type { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js'
	import type { Control } from '@babylonjs/gui/2D/controls/control'
	import type { Grid } from '@babylonjs/gui/2D/controls/grid'
	import { RadioButton } from '@babylonjs/gui/2D/controls/radioButton.js'
	import type { Vector2WithInfo } from '@babylonjs/gui/2D/math2D'
	import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte'
	import type { Writable } from 'svelte/store'

	const parent = getContext<Writable<AdvancedDynamicTexture>>('gui')
	const dispatch = createEventDispatcher()

	export let name = 'RadioButton'
	export let color: RadioButton['color'] = 'white'
	export let background: RadioButton['background'] = 'black'
	export let fontSize: RadioButton['fontSize'] = 24
	export let fontFamily: RadioButton['fontFamily'] = 'Arial'
	export let fontStyle: RadioButton['fontStyle'] = 'normal'
	export let fontWeight: RadioButton['fontWeight'] = '600'
	export let fontSizeInPixels: RadioButton['fontSizeInPixels'] = undefined
	export let fontOffset: RadioButton['fontOffset'] = undefined
	export let paddingBottom: RadioButton['paddingBottom'] = '0px'
	export let paddingTop: RadioButton['paddingTop'] = '0px'
	export let paddingLeft: RadioButton['paddingLeft'] = '0px'
	export let paddingRight: RadioButton['paddingRight'] = '0px'
	export let top: RadioButton['top'] = 0
	export let left: RadioButton['left'] = 0
	export let width = '20px'
	export let height = '20px'
	/**
	 * Define the ratio used to compute the size of the inner checkbox (0.8 by default, which means the inner check size is equal to 80% of the control itself)
	 */
	export let checkSizeRatio = 0.8
	/**
	 * Use the group property to gather radio buttons working on the same value set
	 */
	export let group = `${$parent.name}-RadioGroup`
	export let checked = false

	const grid = getContext<Writable<Grid>>('grid')
	/**
	 * only applicable if the parent is a Grid
	 */
	export let row = 0
	/**
	 * only applicable if the parent is a Grid
	 */
	export let column = 0

	export let guiElement = new RadioButton(name)

	onMount(() => {
		try {
			if (grid) {
				$grid.addControl(guiElement, row, column)
			} else {
				$parent.addControl(guiElement)
			}

			guiElement.isChecked = checked

			guiElement.onIsCheckedChangedObservable.add(value => {
				checked = value
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
		guiElement.background = background
		guiElement.fontFamily = fontFamily
		guiElement.fontOffset = fontOffset
		guiElement.fontSize = fontSize
		guiElement.fontSizeInPixels = fontSizeInPixels
		guiElement.fontStyle = fontStyle
		guiElement.fontWeight = fontWeight
		guiElement.name = name
		guiElement.paddingBottom = paddingBottom
		guiElement.paddingTop = paddingTop
		guiElement.paddingLeft = paddingLeft
		guiElement.paddingRight = paddingRight
		guiElement.top = top
		guiElement.left = left
		guiElement.width = width
		guiElement.height = height
		guiElement.checkSizeRatio = checkSizeRatio
		guiElement.group = group
	}
</script>
