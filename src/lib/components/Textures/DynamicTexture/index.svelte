<!-- @component
The DynamicTexture can be used for creating more complex textures.
It can be used to apply text to a material. This is used in the TextPlane component.
-->
<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  import getParent from '../getParent'

  const root = getRoot()
  const parent = getParent()

  export let name = 'DynamicTexture'
  export let options: Record<string, unknown> = {}
  export let generateMipMaps = false
  export let samplingMode = BABYLON.Texture.TRILINEAR_SAMPLINGMODE
  export let format = BABYLON.Engine.TEXTUREFORMAT_RGBA
  export let invertY = false
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

  export const texture = new BABYLON.DynamicTexture(
    `${name}-Texture`,
    options,
    root.scene,
    generateMipMaps,
    samplingMode,
    format,
    invertY,
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