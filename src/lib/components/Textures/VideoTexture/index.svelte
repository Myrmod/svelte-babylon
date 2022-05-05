<!-- @component
The VideoTexture can be used to play videos on an Object.
-->
<script lang="ts">
  import { createReactiveContext } from '$lib/utils/createReactiveContext'
  import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js'
  import { Texture } from '@babylonjs/core/Materials/Textures/texture.js'
  import {
    VideoTexture,
    type VideoTextureSettings,
  } from '@babylonjs/core/Materials/Textures/videoTexture.js'
  import type { Scene } from '@babylonjs/core/scene'
  import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'

  const scene = getContext<Writable<Scene>>('scene')
  const parent = getContext<Writable<StandardMaterial>>('material')
  if (!($parent instanceof StandardMaterial)) {
    throw new Error('VideoTexture requires a parent of StandardMaterial')
  }

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

  export const texture = createReactiveContext(
    'texture',
    new VideoTexture(
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
    ),
  )

  onMount(() => {
    $parent[textureTarget] = $texture
  })

  onDestroy(() => {
    $parent[textureTarget] = null
    $texture.dispose()
  })
</script>

<slot />
