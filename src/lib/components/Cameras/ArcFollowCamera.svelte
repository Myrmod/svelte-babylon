<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'ArcFollowCamera'
  export let target: BABYLON.AbstractMesh
  export let alpha = -Math.PI / 2
  export let beta = Math.PI / 2
  export let radius = 300
  export const camera = root.cameras[name]

  onMount(() => {
    try {
      if (root.cameras[name]) {
        throw new Error('There can only be one camera with the same name')
      }

      root.cameras[name] = new BABYLON.ArcFollowCamera(
        name,
        alpha,
        beta,
        radius,
        target,
        root.scene,
      )

      root.cameras[name].attachControl(root.canvas.element, false)

      root.engine.runRenderLoop(() => {
        root.scene.render()
      })
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    root.cameras[name] = null
  })
</script>
