<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import type { Nullable } from 'babylonjs'
  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  import getParent from './getParent'

  const root = getRoot()

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
  export let coordinatesMode: number = BABYLON.Texture.EXPLICIT_MODE

  const context = getParent()
  export const texture = new BABYLON.CubeTexture(
    rootUrl,
    root.scene,
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
    context.self[textureTarget] = texture
  })

  onDestroy(() => {
    context.self[textureTarget] = null
  })

  $: if (texture && context.self && context.self[textureTarget]) {
    texture.wrapR = wrapR
    texture.wrapU = wrapU
    texture.wrapV = wrapV
    texture.invertZ = invertZ
    texture.coordinatesMode = coordinatesMode
  }
</script>

<slot />
