<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import type { Nullable } from 'babylonjs'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  import getParent from './getParent'

  const root = getRoot()

  export let url: string
  export let noMipmap: boolean = undefined
  export let invertY: boolean = undefined
  export let invertZ: boolean = undefined
  export let samplingMode: number = undefined
  export let onLoad: Nullable<() => void> = undefined
  export let onError: Nullable<(message: string, exception: any) => void> = undefined
  export let buffer: Nullable<
    string | ArrayBuffer | ArrayBufferView | HTMLImageElement | Blob | ImageBitmap
  > = undefined
  export let deleteBuffer: boolean = undefined
  export let format: number = undefined
  export let mimeType: string = undefined
  export let loaderOptions: any = undefined

  export let uAng = 0
  export let uOffset = 0
  export let uRotationCenter = 0
  export let uScale = 1
  export let vAng = 0
  export let vOffset = 0
  export let vRotationCenter = 0
  export let vScale = 1
  export let wAng = 0
  export let wRotationCenter = 0
  export let wrapR = 1
  export let wrapU = 1
  export let wrapV = 1

  const context = getParent()
  export const texture = new BABYLON.Texture(
    url,
    root.scene,
    noMipmap,
    invertY,
    samplingMode,
    onLoad,
    onError,
    buffer,
    deleteBuffer,
    format,
    mimeType,
    loaderOptions,
  )

  onMount(() => {
    context.self.lightmapTexture = texture
  })

  onDestroy(() => {
    context.self.lightmapTexture = null
  })

  $: if (texture && context.self?.lightmapTexture) {
    texture.uAng = uAng
    texture.uOffset = uOffset
    texture.uRotationCenter = uRotationCenter
    texture.uScale = uScale
    texture.vAng = vAng
    texture.vOffset = vOffset
    texture.vRotationCenter = vRotationCenter
    texture.vScale = vScale
    texture.wAng = wAng
    texture.wRotationCenter = wRotationCenter
    texture.wrapR = wrapR
    texture.wrapU = wrapU
    texture.wrapV = wrapV
    texture.invertZ = invertZ
  }
</script>

<slot />
