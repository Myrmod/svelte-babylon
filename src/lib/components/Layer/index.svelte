<!-- @component
This represents a full screen 2d layer. This can be useful to display a picture in the background of your scene for instance.
 -->
<script lang="ts">
  import { Layer } from '@babylonjs/core/Layers/layer.js'
  import type { Color4 } from '@babylonjs/core/Maths/math.color'
  import { createEventDispatcher, onDestroy, setContext } from 'svelte'

  const scene = getContext<Writable<Scene>>('scene')
  export let name = 'Layer'
  export let img: string
  export let isBackground = true
  export let color: Color4 = undefined

  export const layer = new Layer(name, img, $scene, isBackground, color)

  onDestroy(() => {
    layer.dispose()

    createEventDispatcher()('dispose', name)
  })

  $: setContext('parent', layer)
</script>

{#if layer}
  <slot />
{/if}
