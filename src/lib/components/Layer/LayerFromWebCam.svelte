<!-- @component
This represents a full screen 2d layer, that shows the stream from your web cam.
 -->
<script lang="ts">
  import { createReactiveContext } from '$lib/utils/createReactiveContext'
  import type { Engine } from '@babylonjs/core'
  import { Layer } from '@babylonjs/core/Layers/layer.js'
  import { VideoTexture } from '@babylonjs/core/Materials/Textures/videoTexture.js'
  import type { Color4 } from '@babylonjs/core/Maths/math.color'
  import type { Scene } from '@babylonjs/core/scene'
  import { createEventDispatcher, getContext, onDestroy } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'

  const scene = getContext<Writable<Scene>>('scene')
  const engine = getContext<Writable<Engine>>('engine')
  export let name = 'Layer'
  export let isBackground = true
  export let color: Color4 = undefined
  export let constraint: Parameters<typeof VideoTexture.CreateFromWebCam>[2] = undefined
  export let audioConstaints: Parameters<typeof VideoTexture.CreateFromWebCam>[3] = undefined
  export let invertY: Parameters<typeof VideoTexture.CreateFromWebCam>[4] = undefined

  export const layer = createReactiveContext(
    'layer',
    new Layer(name, null, $scene, isBackground, color),
  )
  VideoTexture.CreateFromWebCam(
    $scene,
    videoTexture => {
      videoTexture.vScale = -1.0
      videoTexture.uScale =
        ((-$engine.getRenderingCanvasClientRect().width /
          $engine.getRenderingCanvasClientRect().height) *
          videoTexture.getSize().height) /
        videoTexture.getSize().width
      $layer.texture = videoTexture
    },
    {
      maxWidth: $engine.getRenderingCanvasClientRect().width,
      maxHeight: $engine.getRenderingCanvasClientRect().height,
      ...constraint,
    },
    audioConstaints,
    invertY,
  )

  onDestroy(() => {
    // There might still be something to do here: https://doc.babylonjs.com/divingDeeper/materials/using/videoTexture#disposal
    $layer.texture.dispose()
    $layer.dispose()

    createEventDispatcher()('dispose', name)
  })
</script>

{#if $layer}
  <slot />
{/if}
