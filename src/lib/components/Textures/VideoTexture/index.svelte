<!-- @component
The VideoTexture can be used to play videos on an Object.
-->
<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import * as BABYLON from 'babylonjs'
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import getParent from '../getParent'

  const root = getRoot()
  const parent = getParent()
  const dispatch = createEventDispatcher()

  export let name = 'VideoTexture'
  export let settings: Partial<BABYLON.VideoTextureSettings> = {}
  export let generateMipMaps = false
  export let samplingMode = BABYLON.Texture.TRILINEAR_SAMPLINGMODE
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

  export const texture = new BABYLON.VideoTexture(
    `${name}-Texture`,
    src,
    root.scene,
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
    root.scene.render()
  })

  onDestroy(() => {
    parent.self[textureTarget] = null
    texture.dispose()
  })
</script>

<slot />
