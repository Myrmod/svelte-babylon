<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import type { EventState, Vector2 } from 'babylonjs'
  import * as GUI from 'babylonjs-gui'
  import { getContext, onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'Button'
  export let text = 'Click Me'
  export let width = '150px'
  export let height = '40px'
  export let color = 'white'
  export let cornerRadius = 20
  export let background = 'green'

  const context = getContext('gui') as GUI.AdvancedDynamicTexture

  export let control = GUI.Button.CreateSimpleButton(name, text)

  onMount(() => {
    try {
      root.gui[context.name].controls[name] = control

      context.addControl(control)

      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    context.removeControl(control)
    control.dispose()
    delete root.gui[context.name].controls[name]
  })

  $: if (root.gui?.[context?.name]?.controls?.[name]) {
    root.scene.render()
  }

  export let onPointerUp: (eventData: GUI.Vector2WithInfo, eventState: EventState) => void =
    undefined
  $: if (onPointerUp) {
    control.onPointerUpObservable.add(onPointerUp)
  }
  export let onPointerDown: (eventData: GUI.Vector2WithInfo, eventState: EventState) => void =
    undefined
  $: if (onPointerDown) {
    control.onPointerDownObservable.add(onPointerUp)
  }
  export let onPointerClick: (eventData: GUI.Vector2WithInfo, eventState: EventState) => void =
    undefined
  $: if (onPointerClick) {
    control.onPointerClickObservable.add(onPointerUp)
  }
  export let onPointerEnter: (eventData: GUI.Control, eventState: EventState) => void = undefined
  $: if (onPointerEnter) {
    control.onPointerEnterObservable.add(onPointerEnter)
  }
  export let onPointerOut: (eventData: GUI.Control, eventState: EventState) => void = undefined
  $: if (onPointerOut) {
    control.onPointerOutObservable.add(onPointerOut)
  }
  export let onPointerMove: (eventData: Vector2, eventState: EventState) => void = undefined
  $: if (onPointerMove) {
    control.onPointerMoveObservable.add(onPointerMove)
  }

  $: if (control) {
    control.name = name
    control.width = width
    control.height = height
    control.color = color
    control.cornerRadius = cornerRadius
    control.background = background
  }
</script>
