<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'Sphere'
  export let receiveShadows = false
  export let options = {}

  export let position = {
    x: 0,
    y: 0,
    z: 0,
  }

  export const object = root.objects[name]

  onMount(() => {
    try {
      root.objects[name] = BABYLON.MeshBuilder.CreateSphere(name, options, root.scene)

      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    root.objects[name] = null
  })

  $: if (root.objects[name]) {
    root.objects[name].position.x = position.x
    root.objects[name].position.y = position.y
    root.objects[name].position.z = position.z
    root.objects[name].receiveShadows = receiveShadows

    root.scene.render()
  }
</script>
