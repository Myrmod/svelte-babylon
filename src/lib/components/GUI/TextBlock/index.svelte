<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import type { EventState, Vector2 } from 'babylonjs'
  import * as GUI from 'babylonjs-gui'
  import { getContext, onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name = 'TextBlock'
  export let text = 'Hello Svelte-Babylon'
  export let color: GUI.TextBlock['color'] = 'white'
  export let fontSize: GUI.TextBlock['fontSize'] = 24
  export let fontFamily: GUI.TextBlock['fontFamily'] = 'Arial'
  export let fontStyle: GUI.TextBlock['fontStyle'] = 'normal'
  export let fontWeight: GUI.TextBlock['fontWeight'] = '600'
  export let fontSizeInPixels: GUI.TextBlock['fontSizeInPixels'] = undefined
  export let fontOffset: GUI.TextBlock['fontOffset'] = undefined
  export let paddingBottom: GUI.TextBlock['paddingBottom'] = '0px'
  export let paddingTop: GUI.TextBlock['paddingTop'] = '0px'
  export let paddingLeft: GUI.TextBlock['paddingLeft'] = '0px'
  export let paddingRight: GUI.TextBlock['paddingRight'] = '0px'
  export let top: GUI.TextBlock['top'] = 0
  export let left: GUI.TextBlock['left'] = 0

  const context = getContext('gui') as GUI.AdvancedDynamicTexture

  export let guiElement = new GUI.TextBlock(name, text)

  onMount(() => {
    try {
      root.gui[context.name].controls[name] = guiElement

      context.addControl(guiElement)

      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    context.removeControl(guiElement)
    guiElement.dispose()
    delete root.gui[context.name].controls[name]
  })

  $: if (root.gui?.[context?.name]?.controls?.[name]) {
    root.scene.render()
  }

  export let onPointerUp: (eventData: GUI.Vector2WithInfo, eventState: EventState) => void =
    undefined
  $: if (onPointerUp) {
    guiElement.onPointerUpObservable.add(onPointerUp)
  }
  export let onPointerDown: (eventData: GUI.Vector2WithInfo, eventState: EventState) => void =
    undefined
  $: if (onPointerDown) {
    guiElement.onPointerDownObservable.add(onPointerUp)
  }
  export let onPointerClick: (eventData: GUI.Vector2WithInfo, eventState: EventState) => void =
    undefined
  $: if (onPointerClick) {
    guiElement.onPointerClickObservable.add(onPointerUp)
  }
  export let onPointerEnter: (eventData: GUI.Control, eventState: EventState) => void = undefined
  $: if (onPointerEnter) {
    guiElement.onPointerEnterObservable.add(onPointerEnter)
  }
  export let onPointerOut: (eventData: GUI.Control, eventState: EventState) => void = undefined
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
