<script lang="ts">
  import { TextureTargets } from '$lib/types/enums/TextureTargets'
  import { createReactiveContext } from '$lib/utils/createReactiveContext'
  import { StandardMaterial as SMaterial } from '@babylonjs/core/Materials/standardMaterial.js'
  import { Texture } from '@babylonjs/core/Materials/Textures/texture.js'
  import { Color3 } from '@babylonjs/core/Maths/math.color'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder.js'
  import type { Scene } from '@babylonjs/core/scene'
  import { getContext, onDestroy } from 'svelte'
  import { CubeTexture, StandardMaterial } from 'svelte-babylon'
  import type { Writable } from 'svelte/types/runtime/store'

  const scene = getContext<Writable<Scene>>('scene')

  export let name: string = 'Skybox'
  export let files: Array<string> = undefined
  export let rootUrl = undefined
  export let receiveShadows = false
  export let options = {
    size: 1000,
  } as Parameters<typeof MeshBuilder.CreateBox>[1]
  export let diffuseColor = new Color3(0, 0, 0)
  export let specularColor = new Color3(0, 0, 0)
  export let scaling = new Vector3(1, 1, 1)

  export let object = createReactiveContext('object', MeshBuilder.CreateBox(name, options, $scene))
  $object.material = new SMaterial(`${name}-material`, $scene)

  export let position = Vector3.Zero()
  export let x: number = undefined
  export let y: number = undefined
  export let z: number = undefined
  export let checkCollisions = false

  onDestroy(() => {
    $object.dispose()
  })

  $: if ($object) {
    $object.position.x = x || position.x
    $object.position.y = y || position.y
    $object.position.z = z || position.z
    $object.receiveShadows = receiveShadows
    $object.checkCollisions = checkCollisions
    $object.scaling = scaling
  }
</script>

<StandardMaterial backfaceCulling={false} {diffuseColor} {specularColor}>
  {#if rootUrl || files?.length}
    <CubeTexture
      textureTarget={TextureTargets.REFLECTION}
      coordinatesMode={Texture.SKYBOX_MODE}
      {files}
      {rootUrl}
    />
  {/if}
</StandardMaterial>

<slot />
