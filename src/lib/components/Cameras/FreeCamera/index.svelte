<script lang="ts">
  import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
  import type { Scene } from '@babylonjs/core/scene.js'
  import { getContext, onDestroy, setContext } from 'svelte'
  import { writable, type Writable } from 'svelte/store'

  const scene = getContext<Writable<Scene>>('scene')
  const canvas = getContext<Writable<HTMLCanvasElement>>('canvas')

  export let name: string = 'FreeCamera'
  export let position = Vector3.Zero()
  export let target = Vector3.Zero()
  export let setActiveOnSceneIfNoneActive = true
  export let speed = 0.75
  export let disableControl = false
  export let applyGravity = false
  export let checkCollisions = false
  export let ellipsoid: Vector3 = undefined
  export let minZ = 0.45
  export let angularSensibility = 3000
  export let parent: Mesh = undefined

  export const getFacingDirection = () =>
    Vector3.Normalize($camera.target.subtract($camera.position))
  export const camera = writable(
    new FreeCamera(name, position, $scene, setActiveOnSceneIfNoneActive),
  )
  setContext('camera', camera)

  onDestroy(() => {
    $camera.dispose()
  })

  $: if ($camera) {
    $camera.speed = speed

    if (disableControl) {
      $camera.detachControl()
    } else {
      $camera.attachControl()
    }

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
