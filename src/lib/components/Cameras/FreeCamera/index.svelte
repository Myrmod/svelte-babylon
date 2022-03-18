<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount, setContext } from 'svelte'

  const root = getRoot()

  export let name: string = 'FreeCamera'
  export let position = BABYLON.Vector3.Zero()
  export let target = BABYLON.Vector3.Zero()
  export let setActiveOnSceneIfNoneActive = true
  export let speed = 0.75
  export let disableControl = false
  export let applyGravity = false
  export let checkCollisions = false
  export let ellipsoid: BABYLON.Vector3 = undefined
  export let minZ = 0.45
  export let angularSensibility = 3000
  export let parent: BABYLON.Mesh = undefined

  export const getFacingDirection = () =>
    BABYLON.Vector3.Normalize(camera.target.subtract(camera.position))
  export const camera = new BABYLON.FreeCamera(
    name,
    position,
    root.scene,
    setActiveOnSceneIfNoneActive,
  )
  setContext('camera', camera)

  onMount(() => {
    try {
      if (root.cameras[camera.id]) {
        throw new Error('There can only be one camera with the same name')
      }

      root.cameras[camera.id] = camera

      root.cameras[camera.id].setTarget(target)

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

    if (disableControl) {
      camera.detachControl()
    } else {
      camera.attachControl()
    }

    camera.applyGravity = applyGravity
    camera.checkCollisions = checkCollisions
    camera.ellipsoid = ellipsoid
    camera.minZ = minZ
    camera.angularSensibility = angularSensibility
    camera.parent = parent

    root.scene.render()
  }
</script>
