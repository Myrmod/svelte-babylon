<!-- @component
This represents a full screen 2d layer, that shows the stream from your web cam.
 -->
<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import { Layer } from '@babylonjs/core/Layers/layer.js'
  import { VideoTexture } from '@babylonjs/core/Materials/Textures/videoTexture.js'
  import type { Color4 } from '@babylonjs/core/Maths/math.color'
  import { createEventDispatcher, onDestroy, setContext } from 'svelte'

  const dispatch = createEventDispatcher()
  const root = getRoot()
  export let name = 'Layer'
  export let isBackground = true
  export let color: Color4 = undefined
  export let data: string
  export let noMipmapOrOptions: Parameters<typeof VideoTexture.CreateFromBase64String>[3] =
    undefined
  export let invertY: Parameters<typeof VideoTexture.CreateFromBase64String>[4] = undefined
  export let samplingMode: Parameters<typeof VideoTexture.CreateFromBase64String>[5] = undefined
  export let format: Parameters<typeof VideoTexture.CreateFromBase64String>[8] = undefined
  export let creationFlags: Parameters<typeof VideoTexture.CreateFromBase64String>[9] = undefined

  export const layer = new Layer(name, null, $root.scene, isBackground, color)
  $: if (layer) {
    if (layer.texture) {
      layer.texture.dispose()
    }
    layer.texture = VideoTexture.CreateFromBase64String(
      data,
      `${name}-Texture`,
      $root.scene,
      noMipmapOrOptions,
      invertY,
      samplingMode,
      () => dispatch('load', layer),
      () => dispatch('error', layer),
      format,
      creationFlags,
    )
  }

  onDestroy(() => {
    layer.dispose()

    dispatch('dispose', name)
  })

  $: setContext('parent', layer)
</script>

{#if layer}
  <slot />
{/if}
