<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import * as GUI from 'babylonjs-gui'
  import { getContext, onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'Button'
  export let text = 'Click Me'

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

  control.width = '150px'
  control.height = '40px'
  control.color = 'white'
  control.cornerRadius = 20
  control.background = 'green'
  control.onPointerUpObservable.add(function () {
    alert('you did it!')
  })
</script>
