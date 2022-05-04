<script lang="ts">
  import type { Vector2 } from '@babylonjs/core/Maths/math.vector'
  import type { EventState } from '@babylonjs/core/Misc/observable'
  import type { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js'
  import type { Control } from '@babylonjs/gui/2D/controls/control'
  import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock.js'
  import type { Vector2WithInfo } from '@babylonjs/gui/2D/math2D'
  import { getContext, onDestroy, onMount } from 'svelte'
  import type { Writable } from 'svelte/store'

  export let name = 'TextBlock'
  export let text = 'Hello Svelte-Babylon'
  export let color: TextBlock['color'] = 'white'
  export let fontSize: TextBlock['fontSize'] = 24
  export let fontFamily: TextBlock['fontFamily'] = 'Arial'
  export let fontStyle: TextBlock['fontStyle'] = 'normal'
  export let fontWeight: TextBlock['fontWeight'] = '600'
  export let fontSizeInPixels: TextBlock['fontSizeInPixels'] = undefined
  export let fontOffset: TextBlock['fontOffset'] = undefined
  export let paddingBottom: TextBlock['paddingBottom'] = '0px'
  export let paddingTop: TextBlock['paddingTop'] = '0px'
  export let paddingLeft: TextBlock['paddingLeft'] = '0px'
  export let paddingRight: TextBlock['paddingRight'] = '0px'
  export let top: TextBlock['top'] = 0
  export let left: TextBlock['left'] = 0

  const parent = getContext<Writable<AdvancedDynamicTexture>>('gui')

  export let guiElement = new TextBlock(name, text)

  onMount(() => {
    try {
      $parent.addControl(guiElement)
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    $parent.removeControl(guiElement)
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
  }
</script>
