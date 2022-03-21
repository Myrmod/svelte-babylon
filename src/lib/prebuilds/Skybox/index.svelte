<script lang="ts">
  import StandardMaterial from '$lib/components/Materials/StandardMaterial/index.svelte'
  import { createObjectContext } from '$lib/components/Objects/createObjectContext'
  import CubeTexture from '$lib/components/Textures/CubeTexture.svelte'
  import { TextureTargets } from '$lib/types/enums/TextureTargets'
  import { getRoot } from '$lib/utils/context'
  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  const root = getRoot()

  export let name: string = 'Skybox'
  export let files: Array<string> = undefined
  export let rootUrl = undefined
  export let receiveShadows = false
  export let options = {
    size: 1000,
  } as Parameters<typeof BABYLON.MeshBuilder.CreateBox>[1]
  export let diffuseColor = new BABYLON.Color3(0, 0, 0)
  export let specularColor = new BABYLON.Color3(0, 0, 0)
  export let scaling = new BABYLON.Vector3(1, 1, 1)

  const context = createObjectContext(BABYLON.MeshBuilder.CreateBox(name, options, root.scene))

  export let position = BABYLON.Vector3.Zero()
  export let x: number = undefined
  export let y: number = undefined
  export let z: number = undefined
  export let checkCollisions = false

  export let object = root.objects[context.self.id]

  onMount(() => {
    try {
      root.objects[context.self.id] = context
      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    context.self.dispose()
    delete root.objects[context.self.id]
  })

  $: if (root.objects[context.self.id]) {
    context.self.position.x = x || position.x
    context.self.position.y = y || position.y
    context.self.position.z = z || position.z
    context.self.receiveShadows = receiveShadows
    context.self.checkCollisions = checkCollisions
    context.self.scaling = scaling

    object = context
    root.scene.render()
  }
</script>

<StandardMaterial backfaceCulling={false} {diffuseColor} {specularColor}>
  {#if rootUrl || files?.length}
    <CubeTexture
      textureTarget={TextureTargets.REFLECTION}
      coordinatesMode={BABYLON.Texture.SKYBOX_MODE}
      {files}
      {rootUrl}
    />
  {/if}
</StandardMaterial>

<slot />