<!-- @component
This represents a full screen 2d layer, that shows the stream from your web cam.
 -->
<script lang="ts">
  import { Layer } from '@babylonjs/core/Layers/layer.js'
  import { VideoTexture } from '@babylonjs/core/Materials/Textures/videoTexture.js'
  import type { Color4 } from '@babylonjs/core/Maths/math.color'
  import { createEventDispatcher, onDestroy, setContext } from 'svelte'

  const scene = getContext<Writable<Scene>>('scene')
  export let name = 'Layer'
  export let isBackground = true
  export let color: Color4 = undefined
  export let constraint: Parameters<typeof VideoTexture.CreateFromWebCam>[2] = undefined
  export let audioConstaints: Parameters<typeof VideoTexture.CreateFromWebCam>[3] = undefined
  export let invertY: Parameters<typeof VideoTexture.CreateFromWebCam>[4] = undefined

  export const layer = new Layer(name, null, $scene, isBackground, color)
  VideoTexture.CreateFromWebCam(
    $scene,
    videoTexture => {
      videoTexture.vScale = -1.0
      videoTexture.uScale =
        ((-$root.canvas.width / $root.canvas.height) * videoTexture.getSize().height) /
        videoTexture.getSize().width
      layer.texture = videoTexture
    },
    {
      maxWidth: $root.canvas.width,
      maxHeight: $root.canvas.height,
      ...constraint,
    },
    audioConstaints,
    invertY,
  )

  onDestroy(() => {
    // There might still be something to do here: https://doc.babylonjs.com/divingDeeper/materials/using/videoTexture#disposal
    layer.texture.dispose()
    layer.dispose()

    createEventDispatcher()('dispose', name)
  })

  $: setContext('parent', layer)
</script>

{#if layer}
  <slot />
{/if}
