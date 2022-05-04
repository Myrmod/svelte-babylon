<!-- @component
This represents a full screen 2d layer. This can be useful to display a picture in the background of your scene for instance.
 -->
<script lang="ts">
  import { createReactiveContext } from '$lib/utils/createReactiveContext'
  import { Layer } from '@babylonjs/core/Layers/layer.js'
  import type { Color4 } from '@babylonjs/core/Maths/math.color'
  import type { Scene } from '@babylonjs/core/scene'
  import { createEventDispatcher, getContext, onDestroy } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'

  const scene = getContext<Writable<Scene>>('scene')
  export let name = 'Layer'
  export let img: string
  export let isBackground = true
  export let color: Color4 = undefined

  export const layer = createReactiveContext(
    'layer',
    new Layer(name, img, $scene, isBackground, color),
  )

  onDestroy(() => {
    $layer.dispose()

    createEventDispatcher()('dispose', name)
  })
</script>

{#if $layer}
  <slot />
{/if}
