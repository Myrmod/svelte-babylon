<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  import { createObjectContext } from './createObjectContext'

  const root = getRoot()

  export let name: string = 'Polygon'
  export let receiveShadows = false
  export let options = {} as Parameters<typeof BABYLON.MeshBuilder.CreatePolygon>[1]

  const context = createObjectContext(BABYLON.MeshBuilder.CreatePolygon(name, options, root.scene))

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
    delete root.objects[context.self.id]
  })

  $: if (root.objects[context.self.id]) {
    context.self.position.x = position.x
    context.self.position.y = position.y
    context.self.position.z = position.z
    context.self.receiveShadows = receiveShadows

    root.scene.render()
  }
</script>

<slot />
