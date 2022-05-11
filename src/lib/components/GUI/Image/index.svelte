<script lang="ts">
  import type { Vector2 } from '@babylonjs/core/Maths/math.vector'
  import type { EventState } from '@babylonjs/core/Misc/observable'
  import type { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js'
  import type { Control } from '@babylonjs/gui/2D/controls/control'
  import type { Grid } from '@babylonjs/gui/2D/controls/grid'
  import { Image } from '@babylonjs/gui/2D/controls/image.js'
  import type { Vector2WithInfo } from '@babylonjs/gui/2D/math2D'
  import { getContext, onDestroy, onMount } from 'svelte'
  import type { Writable } from 'svelte/store'

  export let name = 'Image'
  export let width: number | string = 1
  export let height: number | string = 1
  export let color: Image['color'] = 'white'
  export let top: Image['top'] = 0
  export let left: Image['left'] = 0
  /**
   * - none: Use original size
   * - fill: Scale the image to fill the container
   * - uniform: Scale the image to fill the container but maintain aspect ratio (This is the default value)
   * - extend: Scale the container to adapt to the image size
   * - nine_patch: Scale the image using a nine patch technique. You have to either define the sliceLeft, sliceRight, sliceTop and sliceBottom properties or store data into your image (in the first and last rows and columns) and call populateNinePatchSlicesFromImage = true to read that data.
   */
  export let stretch: 'none' | 'fill' | 'uniform' | 'extend' | 'nine_patch' = 'uniform'
  /**
   * Scales the image control to the size of the source image
   */
  export let autoScale = false
  /**
   * url of the image to use
   */
  export let src: string
  /**
   * x coordinate in the source image (in pixel)
   */
  export let sourceLeft: number = 0
  /**
   * y coordinate in the source image (in pixel)
   */
  export let sourceTop: number = 0
  /**
   * width of the source image you want to use (in pixel)
   */
  export let sourceWidth: number = undefined
  /**
   * height of the source image you want to use (in pixel)
   */
  export let sourceHeight: number = undefined
  /**
   * indicates if pointers should only be validated on pixels with alpha > 0
   */
  export let detectPointerOnOpaqueOnly = false

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
  export let guiElement = new Image(name, src)

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
    guiElement.autoScale = autoScale
    guiElement.sourceLeft = sourceLeft
    guiElement.sourceTop = sourceTop
    if (sourceWidth) guiElement.sourceWidth = sourceWidth
    if (sourceHeight) guiElement.sourceHeight = sourceHeight
    guiElement.detectPointerOnOpaqueOnly = detectPointerOnOpaqueOnly
  }
  $: if (guiElement) {
    switch (stretch) {
      case 'extend':
        guiElement.stretch = Image.STRETCH_EXTEND
        break
      case 'fill':
        guiElement.stretch = Image.STRETCH_FILL

        break
      case 'nine_patch':
        guiElement.stretch = Image.STRETCH_NINE_PATCH

        break
      case 'none':
        guiElement.stretch = Image.STRETCH_NONE

        break
      case 'uniform':
        guiElement.stretch = Image.STRETCH_UNIFORM

        break

      default:
        break
    }
  }
</script>
