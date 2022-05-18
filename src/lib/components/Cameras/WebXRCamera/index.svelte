<script lang="ts">
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
  import type { Scene } from '@babylonjs/core/scene.js'
  import { WebXRCamera } from '@babylonjs/core/XR/webXRCamera.js'
  import type { WebXRSessionManager } from '@babylonjs/core/XR/webXRSessionManager'
  import { getContext, onDestroy, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import type { Writable } from 'svelte/types/runtime/store'

  const scene = getContext<Writable<Scene>>('scene')
  const sessionManager = getContext<Writable<WebXRSessionManager>>('WebXRSessionManager')
  const canvas = getContext<Writable<HTMLCanvasElement>>('canvas')

  export let name: string = 'WebXRCamera'
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
  const parent: Mesh = undefined

  export const getFacingDirection = () =>
    Vector3.Normalize($camera.target.subtract($camera.position))
  export const camera = writable(new WebXRCamera(name, $scene, $sessionManager))
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
    $camera.position = position
  }

  $: if ($camera === $scene.activeCamera) {
    $camera.attachControl($canvas, false)
  }

  if (setActiveOnSceneIfNoneActive) {
    $scene.activeCamera = $camera
  }
</script>
