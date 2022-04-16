<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import { ArcFollowCamera } from '@babylonjs/core/Cameras/followCamera'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
  import { onDestroy, onMount, setContext } from 'svelte'

  const root = getRoot()

  export let name: string = 'ArcFollowCamera'
  export let target: AbstractMesh
  export let alpha = -Math.PI / 2
  export let beta = Math.PI / 2
  export let radius = 5
  export let speed = 1
  export const getFacingDirection = () => Vector3.Normalize(camera.target.subtract(camera.position))
  export const camera = new ArcFollowCamera(name, alpha, beta, radius, target, root.scene)
  setContext('camera', camera)

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
    camera.dispose()
    root.cameras[camera.id] = null
  })

  $: if (root.cameras[camera.id]) {
    camera.speed = speed

    root.scene.render()
  }
</script>
