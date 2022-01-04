<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'ArcRotateCamera'
  export let target = BABYLON.Vector3.Zero()
  export let alpha = -Math.PI / 2
  export let beta = Math.PI / 2
  export let radius = 5
  export let setActiveOnSceneIfNoneActive = true
  export let speed = 1
  export const camera = new BABYLON.ArcRotateCamera(
    name,
    alpha,
    beta,
    radius,
    target,
    root.scene,
    setActiveOnSceneIfNoneActive,
  )

  onMount(() => {
    try {
      if (root.cameras[camera.id]) {
        throw new Error('There can only be one camera with the same name')
      }

      root.cameras[camera.id] = camera

      root.cameras[camera.id].attachControl(root.canvas.element, false)

      root.engine.runRenderLoop(() => {
        root.scene.render()
      })
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    root.cameras[camera.id] = null
  })

  $: if (root.cameras[camera.id]) {
    camera.speed = speed

    root.scene.render()
  }
</script>
