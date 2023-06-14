<script lang="ts">
	import type { Vector2 } from '@babylonjs/core/Maths/math.vector'
	import type { EventState } from '@babylonjs/core/Misc/observable'
	import type { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js'
	import type { Control } from '@babylonjs/gui/2D/controls/control'
	import type { Grid } from '@babylonjs/gui/2D/controls/grid'
	import {
		VirtualKeyboard,
		type KeyPropertySet,
	} from '@babylonjs/gui/2D/controls/virtualKeyboard.js'
	import type { Vector2WithInfo } from '@babylonjs/gui/2D/math2D'
	import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte'
	import type { Writable } from 'svelte/store'

	const dispatch = createEventDispatcher()

	export let name = 'VirtualKeyboard'
	export let fontSize: VirtualKeyboard['fontSize'] = 24
	export let fontFamily: VirtualKeyboard['fontFamily'] = 'Arial'
	export let fontStyle: VirtualKeyboard['fontStyle'] = 'normal'
	export let fontWeight: VirtualKeyboard['fontWeight'] = '600'
	export let fontSizeInPixels: VirtualKeyboard['fontSizeInPixels'] = undefined
	export let fontOffset: VirtualKeyboard['fontOffset'] = undefined
	export let paddingBottom: VirtualKeyboard['paddingBottom'] = '0px'
	export let paddingTop: VirtualKeyboard['paddingTop'] = '0px'
	export let paddingLeft: VirtualKeyboard['paddingLeft'] = '0px'
	export let paddingRight: VirtualKeyboard['paddingRight'] = '0px'
	export let top: VirtualKeyboard['top'] = 0
	export let left: VirtualKeyboard['left'] = 0
	export let width: number | string = 1
	export let height: number | string = 1
	export let isVertical = true
	export let defaultButtonWidth = '40px'
	export let defaultButtonHeight = '40px'
	export let defaultButtonPaddingLeft = '2px'
	export let defaultButtonPaddingRight = '2px'
	export let defaultButtonPaddingTop = '2px'
	export let defaultButtonPaddingBottom = '2px'
	export let defaultButtonColor = '#DDD'
	export let defaultButtonBackground = '#070707'
	export let keyRows: Array<
		Array<string> | { vals: Array<string>; propertySets?: Array<KeyPropertySet> }
	> = undefined

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

	export let guiElement = new VirtualKeyboard(name)

	onMount(() => {
		try {
			if (grid) {
				$grid.addControl(guiElement, row, column)
			} else {
				$parent.addControl(guiElement)
			}

			keyRows?.forEach(row => {
				if (typeof row[0] !== 'string') {
					const casted = row as { vals: Array<string>; propertySets?: Array<KeyPropertySet> }

					guiElement.addKeysRow(casted.vals, casted.propertySets)
					return
				}

				const casted = row as Array<string>

				guiElement.addKeysRow(casted)
			})

			guiElement.onKeyPressObservable.add(value => {
				dispatch('keyPress', value)
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
		guiElement.isVertical = isVertical
		guiElement.defaultButtonWidth = defaultButtonWidth
		guiElement.defaultButtonHeight = defaultButtonHeight
		guiElement.defaultButtonPaddingLeft = defaultButtonPaddingLeft
		guiElement.defaultButtonPaddingRight = defaultButtonPaddingRight
		guiElement.defaultButtonPaddingTop = defaultButtonPaddingTop
		guiElement.defaultButtonPaddingBottom = defaultButtonPaddingBottom
		guiElement.defaultButtonColor = defaultButtonColor
		guiElement.defaultButtonBackground = defaultButtonBackground
	}
</script>
