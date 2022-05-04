<script lang="ts">
  import { FlyCamera } from '@babylonjs/core/Cameras/flyCamera.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { Scene } from '@babylonjs/core/scene.js'
  import { getContext, onDestroy, onMount, setContext } from 'svelte'
  import { writable, type Writable } from 'svelte/store'

  const scene = getContext<Writable<Scene>>('scene')

  export let name: string = 'FlyCamera'
  export let position = Vector3.Zero()
  export let target = Vector3.Zero()
  export let setActiveOnSceneIfNoneActive = true
  export let speed = 1
  export const getFacingDirection = () =>
    Vector3.Normalize($camera.target.subtract($camera.position))
  export const camera = writable(
    new FlyCamera(name, position, $scene, setActiveOnSceneIfNoneActive),
  )
  setContext('camera', camera)

  onMount(() => {
    try {
      if (!$scene.activeCamera) {
        $camera.attachControl(false)
      }
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    $camera.dispose()
  })

  $: if ($camera) {
    $camera.speed = speed
    $camera.setTarget(target)
  }
</script>
