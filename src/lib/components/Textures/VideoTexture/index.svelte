<!-- @component
The VideoTexture can be used to play videos on an Object.
-->
<script lang="ts">
  import { Texture } from '@babylonjs/core/Materials/Textures/texture.js'
  import {
    VideoTexture,
    type VideoTextureSettings,
  } from '@babylonjs/core/Materials/Textures/videoTexture.js'
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import getParent from '../getParent'

  const scene = getContext<Writable<Scene>>('scene')
  const parent = getParent()
  const dispatch = createEventDispatcher()

  export let name = 'VideoTexture'
  export let settings: Partial<VideoTextureSettings> = {}
  export let generateMipMaps = false
  export let samplingMode = Texture.TRILINEAR_SAMPLINGMODE
  export let invertY = false
  /**
   * url of the video
   */
  export let src: string | string[] | HTMLVideoElement
  export let textureTarget:
    | 'ambientTexture'
    | 'bumpTexture'
    | 'diffuseTexture'
    | 'emissiveTexture'
    | 'lightmapTexture'
    | 'opacityTexture'
    | 'reflectionTexture'
    | 'refractionTexture'
    | 'specularTexture' = 'diffuseTexture'

  export const texture = new VideoTexture(
    `${name}-Texture`,
    src,
    $scene,
    generateMipMaps,
    invertY,
    samplingMode,
    settings,
    (message, exception) => {
      dispatch('error', { message, exception })
    },
  )

  onMount(() => {
    parent.self[textureTarget] = texture
  })

  onDestroy(() => {
    parent.self[textureTarget] = null
    texture.dispose()
  })
</script>

<slot />
