<script lang="ts">
  import type { Vector2 } from '@babylonjs/core/Maths/math.vector'
  import type { EventState } from '@babylonjs/core/Misc/observable'
  import type { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js'
  import type { Control } from '@babylonjs/gui/2D/controls/control'
  import { DisplayGrid } from '@babylonjs/gui/2D/controls/displayGrid.js'
  import type { Grid } from '@babylonjs/gui/2D/controls/grid'
  import type { Vector2WithInfo } from '@babylonjs/gui/2D/math2D'
  import { getContext, onDestroy, onMount } from 'svelte'
  import type { Writable } from 'svelte/store'

  export let name = 'DisplayGrid'
  /**
   * Defines the color of the grid background
   */
  export let background = 'Black'
  /**
   * Defines the width of each cell
   */
  export let cellWidth = 20
  /**
   * Defines the height of each cell
   */
  export let cellHeight = 20
  /**
   * Defines the tickness of minor lines
   */
  export let minorLineTickness = 1
  /**
   * Defines the color of the minor lines
   */
  export let minorLineColor = 'DarkGray'
  /**
   * Defines the tickness of major lines
   */
  export let majorLineTickness = 2
  /**
   * Defines the color of the major lines
   */
  export let majorLineColor = 'White'
  /**
   * Defines the frequency of major lines
   */
  export let majorLineFrequency = 5
  export let width: number | string = 1
  export let height: number | string = 1
  export let paddingBottom: DisplayGrid['paddingBottom'] = '0px'
  export let paddingTop: DisplayGrid['paddingTop'] = '0px'
  export let paddingLeft: DisplayGrid['paddingLeft'] = '0px'
  export let paddingRight: DisplayGrid['paddingRight'] = '0px'
  export let top: DisplayGrid['top'] = 0
  export let left: DisplayGrid['left'] = 0

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

  export let guiElement = new DisplayGrid(name)

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
    guiElement.background = background
    guiElement.cellHeight = cellHeight
    guiElement.cellWidth = cellWidth
    guiElement.height = height
    guiElement.left = left
    guiElement.majorLineColor = majorLineColor
    guiElement.majorLineFrequency = majorLineFrequency
    guiElement.majorLineTickness = majorLineTickness
    guiElement.minorLineColor = minorLineColor
    guiElement.minorLineTickness = minorLineTickness
    guiElement.name = name
    guiElement.paddingBottom = paddingBottom
    guiElement.paddingLeft = paddingLeft
    guiElement.paddingRight = paddingRight
    guiElement.paddingTop = paddingTop
    guiElement.top = top
    guiElement.width = width
  }
</script>
