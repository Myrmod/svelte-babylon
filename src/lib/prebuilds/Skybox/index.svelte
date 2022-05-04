<script lang="ts">
  import { createObjectContext } from '$lib/components/Objects/createObjectContext'
  import { TextureTargets } from '$lib/types/enums/TextureTargets'
  import { StandardMaterial as SMaterial } from '@babylonjs/core/Materials/standardMaterial.js'
  import { Texture } from '@babylonjs/core/Materials/Textures/texture.js'
  import { Color3 } from '@babylonjs/core/Maths/math.color'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder.js'
  import { onDestroy, onMount } from 'svelte'
  import { CubeTexture, StandardMaterial } from 'svelte-babylon'

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

  const context = createObjectContext(MeshBuilder.CreateBox(name, options, $scene))
  context.self.material = new SMaterial(`${name}-material`, $scene)

  export let position = Vector3.Zero()
  export let x: number = undefined
  export let y: number = undefined
  export let z: number = undefined
  export let checkCollisions = false

  export let object = $root.objects[context.self.id]

  onMount(() => {
    try {
      $root.objects[context.self.id] = context
      $scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    context.self.dispose()
    delete $root.objects[context.self.id]
  })

  $: if ($root.objects[context.self.id]) {
    context.self.position.x = x || position.x
    context.self.position.y = y || position.y
    context.self.position.z = z || position.z
    context.self.receiveShadows = receiveShadows
    context.self.checkCollisions = checkCollisions
    context.self.scaling = scaling

    object = context
    $scene.render()
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
