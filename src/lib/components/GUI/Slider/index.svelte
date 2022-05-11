<script lang="ts">
  import type { Vector2 } from '@babylonjs/core/Maths/math.vector'
  import type { EventState } from '@babylonjs/core/Misc/observable'
  import type { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js'
  import type { Control } from '@babylonjs/gui/2D/controls/control'
  import type { Grid } from '@babylonjs/gui/2D/controls/grid'
  import { Slider } from '@babylonjs/gui/2D/controls/sliders/slider.js'
  import type { Vector2WithInfo } from '@babylonjs/gui/2D/math2D'
  import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte'
  import type { Writable } from 'svelte/store'

  const dispatch = createEventDispatcher()

  export let name = 'Slider'
  export let color: Slider['color'] = 'white'
  export let fontSize: Slider['fontSize'] = 24
  export let fontFamily: Slider['fontFamily'] = 'Arial'
  export let fontStyle: Slider['fontStyle'] = 'normal'
  export let fontWeight: Slider['fontWeight'] = '600'
  export let fontSizeInPixels: Slider['fontSizeInPixels'] = undefined
  export let fontOffset: Slider['fontOffset'] = undefined
  export let paddingBottom: Slider['paddingBottom'] = '0px'
  export let paddingTop: Slider['paddingTop'] = '0px'
  export let paddingLeft: Slider['paddingLeft'] = '0px'
  export let paddingRight: Slider['paddingRight'] = '0px'
  export let top: Slider['top'] = 0
  export let left: Slider['left'] = 0
  export let width: number | string = undefined
  export let height: number | string = undefined
  export let value = 0
  export let minimum = 0
  export let maximum = 100
  export let step = 0

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

  export let guiElement = new Slider(name)

  onMount(() => {
    try {
      if (grid) {
        $grid.addControl(guiElement, row, column)
      } else {
        $parent.addControl(guiElement)
      }
      guiElement.value = value
      guiElement.onValueChangedObservable.add(v => {
        value = v
        dispatch('change', v)
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
    guiElement.paddingBottom = paddingBottom
    guiElement.paddingTop = paddingTop
    guiElement.paddingLeft = paddingLeft
    guiElement.paddingRight = paddingRight
    guiElement.top = top
    guiElement.left = left
    guiElement.minimum = minimum
    guiElement.maximum = maximum
    guiElement.step = step
    if (width) guiElement.width = width
    if (height) guiElement.height = height
  }
</script>
