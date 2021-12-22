<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'FreeCamera'
  export let position = BABYLON.Vector3.Zero()
  export let target = BABYLON.Vector3.Zero()
  export let setActiveOnSceneIfNoneActive = true
  export const camera = root.cameras[name]

  onMount(() => {
    try {
      if (root.cameras[name]) {
        throw new Error('There can only be one camera with the same name')
      }

      root.cameras[name] = new BABYLON.FreeCamera(
        name,
        position,
        root.scene,
        setActiveOnSceneIfNoneActive,
      )

      root.cameras[name].setTarget(target)
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
