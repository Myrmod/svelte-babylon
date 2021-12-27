<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  import { createObjectContext } from './createObjectContext'

  const root = getRoot()

  export let name: string = 'Ground'
  export let options = {} as Parameters<typeof BABYLON.MeshBuilder.CreateGround>[1]

  const context = createObjectContext(BABYLON.MeshBuilder.CreateGround(name, options, root.scene))

  export let receiveShadows = false
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
    context.self.receiveShadows = receiveShadows
  }
</script>

<slot />
