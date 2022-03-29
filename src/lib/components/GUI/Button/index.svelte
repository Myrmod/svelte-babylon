<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import type { EventState, Vector2 } from 'babylonjs'
  import * as GUI from 'babylonjs-gui'
  import { getContext, onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name = 'Button'
  export let text = 'Click Me'
  export let width: GUI.Button['width'] = '150px'
  export let height: GUI.Button['height'] = '40px'
  export let color: GUI.Button['color'] = 'white'
  export let cornerRadius: GUI.Button['cornerRadius'] = 20
  export let background: GUI.Button['background'] = 'green'
  export let paddingBottom: GUI.Button['paddingBottom'] = '0px'
  export let paddingTop: GUI.Button['paddingTop'] = '0px'
  export let paddingLeft: GUI.Button['paddingLeft'] = '0px'
  export let paddingRight: GUI.Button['paddingRight'] = '0px'
  export let top: GUI.Button['top'] = 0
  export let left: GUI.Button['left'] = 0

  const context = getContext('gui') as GUI.AdvancedDynamicTexture

  export let guiElement = GUI.Button.CreateSimpleButton(name, text)

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
    delete root.gui[context.name]
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
