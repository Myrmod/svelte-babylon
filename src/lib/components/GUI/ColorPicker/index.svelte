<script lang="ts">
  import { Color3 } from '@babylonjs/core'
  import type { Vector2 } from '@babylonjs/core/Maths/math.vector'
  import type { EventState } from '@babylonjs/core/Misc/observable'
  import type { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js'
  import { ColorPicker } from '@babylonjs/gui/2D/controls/colorpicker.js'
  import type { Control } from '@babylonjs/gui/2D/controls/control'
  import type { Grid } from '@babylonjs/gui/2D/controls/grid'
  import type { Vector2WithInfo } from '@babylonjs/gui/2D/math2D'
  import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte'
  import type { Writable } from 'svelte/store'
  const dispatch = createEventDispatcher()

  export let name = 'ColorPicker'
  export let color = Color3.Gray()
  export let top: ColorPicker['top'] = 0
  export let left: ColorPicker['left'] = 0

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

  export let guiElement = new ColorPicker(name)

  onMount(() => {
    try {
      guiElement.value = color

      guiElement.onValueChangedObservable.add(value => {
        color = value
        dispatch('change', value)
      })

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
    guiElement.top = top
    guiElement.left = left
  }
</script>
