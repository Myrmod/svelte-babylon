<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  import { createObjectcontext } from './createObjectContext'

  const root = getRoot()

  export let name: string = 'TiledGround'
  export let receiveShadows = false
  export let options = {} as Parameters<typeof BABYLON.MeshBuilder.CreateTiledGround>[1]

  const context = createObjectcontext(
    BABYLON.MeshBuilder.CreateTiledGround(name, options, root.scene),
  )

  export let position = new BABYLON.Vector3(0, 0, 0)

  export const object = root.objects[context.self.id]

  onMount(() => {
    try {
      root.objects[context.self.id] = context
      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    root.objects[context.self.id] = null
  })

  $: if (root.objects[context.self.id]) {
    context.self.position.x = position.x
    context.self.position.y = position.y
    context.self.position.z = position.z
    context.self.receiveShadows = receiveShadows

    root.scene.render()
  }
</script>
