<!-- @component
  Creates a Plane to with a text placed on it using the StandardMaterial and the DynamicTexture.
  Only single line texts can be rendered though.
-->
<script lang="ts">
  import StandardMaterial from '$lib/components/Materials/StandardMaterial/index.svelte'
  import Plane from '$lib/components/Objects/Plane/index.svelte'
  import TextTexture from '$lib/components/Textures/TextTexture/index.svelte'
  import { Engine } from '@babylonjs/core/Engines/engine.js'
  import { Texture } from '@babylonjs/core/Materials/Textures/texture.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder.js'

  export let name = 'TextPlane'
  export let text = 'svelte-babylon'
  export let fontFamily = 'Arial'
  export let planeOptions: Parameters<typeof MeshBuilder.CreatePlane>[1] = undefined
  export let textureOptions: Record<string, unknown> = {}
  export let generateMipMaps = false
  export let samplingMode = Texture.TRILINEAR_SAMPLINGMODE
  export let format = Engine.TEXTUREFORMAT_RGBA
  export let invertY = false
  export let sizeMultiplier = 60
  export let fontSizeMultiplier = 1
  export let textOffsetX: number = null
  export let textOffsetY: number = null
  export let position = Vector3.Zero()
  export let x: number = undefined
  export let y: number = undefined
  export let z: number = undefined
  export let rotation = Vector3.Zero()
  export let checkCollisions = false

  /**
   * color string eg '#000000'
   */
  export let color = '#000000'
  /**
   * color string eg '#ffffff'
   */
  export let backgroundColor = '#ffffff'

  let dtWidth = (planeOptions?.width || 1) * sizeMultiplier
  let dtHeight = (planeOptions?.height || 1) * sizeMultiplier
  $: dtWidth = (planeOptions?.width || 1) * sizeMultiplier
  $: dtHeight = (planeOptions?.height || 1) * sizeMultiplier
</script>

<Plane {name} options={planeOptions} {position} {rotation} {x} {y} {z} {checkCollisions}>
  <StandardMaterial name={`${name}-Material`}>
    <TextTexture
      name={`${name}-Texture`}
      options={{
        width: dtWidth,
        height: dtHeight,
        ...textureOptions,
      }}
      {generateMipMaps}
      {samplingMode}
      {format}
      {invertY}
      {text}
      {fontFamily}
      {textOffsetX}
      {textOffsetY}
      {color}
      {backgroundColor}
      {fontSizeMultiplier}
    />
  </StandardMaterial>
  <slot />
</Plane>
