<script lang="ts">
  import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector.js'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
  import type { Scene } from '@babylonjs/core/scene.js'
  import { getContext, onDestroy, onMount, setContext } from 'svelte'
  import { writable, type Writable } from 'svelte/store'

  const scene = getContext<Writable<Scene>>('scene')
  const canvas = getContext<Writable<HTMLCanvasElement>>('canvas')

  export let name: string = 'UniversalCamera'
  export let position = Vector3.Zero()
  export let target = Vector3.Zero()
  export let speed = 0.75
  export let disableControl = false
  export let applyGravity = false
  export let checkCollisions = false
  export let ellipsoid: Vector3 = undefined
  export let minZ = 0.45
  export let angularSensibility = 3000
  export let parent: Mesh = undefined
  export let setActiveOnSceneIfNoneActive = true

  export const getFacingDirection = () =>
    Vector3.Normalize($camera.target.subtract($camera.position))
  export const camera = writable(new UniversalCamera(name, position, $scene))
  setContext('camera', camera)

  onMount(() => {
    try {
      if (!$scene.activeCamera) {
        $camera.attachControl($canvas, false)
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
    $camera.applyGravity = applyGravity
    $camera.checkCollisions = checkCollisions
    $camera.ellipsoid = ellipsoid
    $camera.minZ = minZ
    $camera.angularSensibility = angularSensibility
    $camera.parent = parent
    $camera.target = target
  }

  $: if ($camera === $scene.activeCamera) {
    $camera.attachControl($canvas, false)
  }

  if (setActiveOnSceneIfNoneActive) {
    $scene.activeCamera = $camera
  }
</script>
