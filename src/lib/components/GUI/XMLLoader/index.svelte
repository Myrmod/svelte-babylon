<script lang="ts">
  import { Texture } from '@babylonjs/core/Materials/Textures/texture.js'
  import type { Scene } from '@babylonjs/core/scene.js'
  import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js'
  import { XmlLoader } from '@babylonjs/gui/2D/xmlLoader.js'
  import { createEventDispatcher, getContext, onDestroy } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'

  const dispatch = createEventDispatcher()

  const scene = getContext<Writable<Scene>>('scene')

  export let name: string = 'GUI'
  export let foreground = true
  export let sampling: Parameters<typeof AdvancedDynamicTexture.CreateFullscreenUI>[3] =
    Texture.BILINEAR_SAMPLINGMODE
  export let adaptiveScaling = false
  /**
   * url to the xml file
   */
  export let src: string

  /**
   * set this to null if you don't want to attach the xml to a texture
   */
  export let texture = AdvancedDynamicTexture.CreateFullscreenUI(
    name,
    foreground,
    $scene,
    sampling,
    adaptiveScaling,
  )

  export const xmlLoader = new XmlLoader(this)

  onDestroy(() => {
    texture.dispose()
    xmlLoader.dispose()
  })

  $: if (xmlLoader) {
    xmlLoader.loadLayout(
      src,
      texture,
      () => dispatch('success', xmlLoader),
      () => {
        console.warn('error in XMLLoader', xmlLoader)
        dispatch('error', xmlLoader)
      },
    )
  }
</script>
