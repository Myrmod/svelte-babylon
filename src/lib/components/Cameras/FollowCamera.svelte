<script lang="ts">
  import { FollowCamera } from '@babylonjs/core/Cameras/followCamera.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
  import type { Scene } from '@babylonjs/core/scene.js'
  import { getContext, onDestroy, onMount, setContext } from 'svelte'
  import { writable, type Writable } from 'svelte/store'

  const scene = getContext<Writable<Scene>>('scene')
  const parent = getContext<Writable<AbstractMesh>>('object')

  if (!($parent instanceof AbstractMesh)) {
    throw new Error('FollowCamera requires a parent of AbstractMesh')
  }

  export let name: string = 'FollowCamera'
  export let position = Vector3.Zero()
  export let speed = 1
  export let setActiveOnSceneIfNoneActive = true
  export let disableControl = false
  export const getFacingDirection = () =>
    Vector3.Normalize($camera.target.subtract($camera.position))
  export const camera = writable(new FollowCamera(name, position, $scene, $parent))
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
    if (disableControl) {
      $camera.detachControl()
    } else {
      $camera.attachControl()
    }

    $camera.speed = speed
  }

  $: if ($camera === $scene.activeCamera) {
    $camera.attachControl(false)
  }

  if (setActiveOnSceneIfNoneActive) {
    $scene.activeCamera = $camera
  }
</script>
