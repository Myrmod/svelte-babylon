<script lang="ts">
  import { CubeTexture } from '@babylonjs/core/Materials/Textures/cubeTexture.js'
  import { Texture } from '@babylonjs/core/Materials/Textures/texture.js'
  import type { Nullable } from '@babylonjs/core/types'
  import { onDestroy, onMount } from 'svelte'
  import getParent from './getParent'

  const scene = getContext<Writable<Scene>>('scene')

  export let rootUrl = '/'
  export let textureTarget:
    | 'ambientTexture'
    | 'bumpTexture'
    | 'diffuseTexture'
    | 'emissiveTexture'
    | 'lightmapTexture'
    | 'opacityTexture'
    | 'reflectionTexture'
    | 'refractionTexture'
    | 'specularTexture' = 'reflectionTexture'
  export let noMipmap: boolean = undefined
  export let invertZ: boolean = undefined
  export let onLoad: Nullable<() => void> = undefined
  export let onError: Nullable<(message: string, exception: any) => void> = undefined
  export let format: number = undefined
  export let extensions: Array<string> = undefined
  export let files: Array<string> = undefined
  export let prefiltered: boolean = undefined
  export let forcedExtension: any = undefined
  export let createPolynomoals: boolean = undefined
  export let lodScale: number = undefined
  export let lodOffset: number = undefined
  export let loaderOptions: any = undefined

  export let wrapR = 1
  export let wrapU = 1
  export let wrapV = 1
  export let coordinatesMode: number = Texture.EXPLICIT_MODE

  const parent = getParent()
  export const texture = new CubeTexture(
    rootUrl,
    $scene,
    extensions,
    noMipmap,
    files,
    onLoad,
    onError,
    format,
    prefiltered,
    forcedExtension,
    createPolynomoals,
    lodScale,
    lodOffset,
    loaderOptions,
  )

  onMount(() => {
    parent.self[textureTarget] = texture
  })

  onDestroy(() => {
    parent.self[textureTarget] = null
    texture.dispose()
  })

  $: if (texture && parent.self && parent.self[textureTarget]) {
    texture.wrapR = wrapR
    texture.wrapU = wrapU
    texture.wrapV = wrapV
    texture.invertZ = invertZ
    texture.coordinatesMode = coordinatesMode
  }
</script>

<slot />
