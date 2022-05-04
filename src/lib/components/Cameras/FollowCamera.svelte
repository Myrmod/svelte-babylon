<script lang="ts">
  import { FollowCamera } from '@babylonjs/core/Cameras/followCamera.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
  import type { Scene } from '@babylonjs/core/scene.js'
  import { getContext, onDestroy, onMount, setContext } from 'svelte'
  import { writable, type Writable } from 'svelte/store'

  const scene = getContext<Writable<Scene>>('scene')

  export let name: string = 'FollowCamera'
  export let position = Vector3.Zero()
  export let lockedTarget: AbstractMesh
  export let speed = 1
  export const getFacingDirection = () =>
    Vector3.Normalize($camera.target.subtract($camera.position))
  export const camera = writable(new FollowCamera(name, position, $scene, lockedTarget))
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
  }
</script>
