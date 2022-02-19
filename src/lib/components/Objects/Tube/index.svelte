<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  import { createObjectContext } from '../createObjectContext'

  const root = getRoot()

  export let name: string = 'Tube'
  export let receiveShadows = false
  export let options = {} as Parameters<typeof BABYLON.MeshBuilder.CreateTube>[1]

  const context = createObjectContext(BABYLON.MeshBuilder.CreateTube(name, options, root.scene))

  export let position = BABYLON.Vector3.Zero()
  export let x: number = undefined
  export let y: number = undefined
  export let z: number = undefined

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

    object = context
    root.scene.render()
  }
</script>

<slot />
