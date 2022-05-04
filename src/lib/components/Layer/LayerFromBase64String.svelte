<!-- @component
This represents a full screen 2d layer, that shows the stream from your web cam.
 -->
<script lang="ts">
  import { createReactiveContext } from '$lib/utils/createReactiveContext'
  import { Layer } from '@babylonjs/core/Layers/layer.js'
  import { VideoTexture } from '@babylonjs/core/Materials/Textures/videoTexture.js'
  import type { Color4 } from '@babylonjs/core/Maths/math.color'
  import type { Scene } from '@babylonjs/core/scene'
  import { createEventDispatcher, getContext, onDestroy } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'

  const dispatch = createEventDispatcher()
  const scene = getContext<Writable<Scene>>('scene')
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

  export const layer = createReactiveContext(
    'layer',
    new Layer(name, null, $scene, isBackground, color),
  )
  $: if (layer) {
    if ($layer.texture) {
      $layer.texture.dispose()
    }
    $layer.texture = VideoTexture.CreateFromBase64String(
      data,
      `${name}-Texture`,
      $scene,
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
    $layer.dispose()

    dispatch('dispose', name)
  })
</script>

{#if $layer}
  <slot />
{/if}
