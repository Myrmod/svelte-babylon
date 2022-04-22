<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import { TargetCamera } from '@babylonjs/core/Cameras/targetCamera.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import { Viewport } from '@babylonjs/core/Maths/math.viewport'
  import type { Node } from '@babylonjs/core/node'
  import { onDestroy, onMount, setContext } from 'svelte'

  const root = getRoot()

  export let name: string = 'FreeCamera'
  export let position = Vector3.Zero()
  export let setActiveOnSceneIfNoneActive = true
  export let disableControl = false
  export let minZ = 0.45
  export let parent: Node
  export let viewport: Viewport = new Viewport(0, 0, 1, 0.5)

  export const getFacingDirection = () => Vector3.Normalize(camera.target.subtract(camera.position))
  export const camera = new TargetCamera(name, position, root.scene, setActiveOnSceneIfNoneActive)
  setContext('camera', camera)

  onMount(() => {
    try {
      if (root.cameras[camera.id]) {
        throw new Error('There can only be one camera with the same name')
      }

      root.cameras[camera.id] = camera

      root.engine.runRenderLoop(() => {
        if (root.scene.cameras.length) {
          root.scene.render()
        }
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
    if (disableControl) {
      camera.detachControl()
    } else {
      camera.attachControl()
    }

    camera.minZ = minZ
    camera.parent = parent
    camera.viewport = viewport

    root.scene.render()
  }
</script>
