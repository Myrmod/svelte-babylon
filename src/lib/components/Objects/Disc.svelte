<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  import { createObjectcontext } from './createObjectContext'

  const root = getRoot()

  export let name: string = 'Disc'
  export let receiveShadows = false
  export let options = {} as Parameters<typeof BABYLON.MeshBuilder.CreateDisc>[1]

  const context = createObjectcontext(BABYLON.MeshBuilder.CreateDisc(name, options, root.scene))

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
    root.objects[name].position.x = position.x
    root.objects[name].position.y = position.y
    root.objects[name].position.z = position.z
    root.objects[name].receiveShadows = receiveShadows

    root.scene.render()
  }
</script>
