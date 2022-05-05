<script lang="ts">
  import type { Mesh } from '@babylonjs/core'
  import { TargetCamera } from '@babylonjs/core/Cameras/targetCamera.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import { Viewport } from '@babylonjs/core/Maths/math.viewport'
  import type { Scene } from '@babylonjs/core/scene.js'
  import { getContext, onDestroy, setContext } from 'svelte'
  import { writable, type Writable } from 'svelte/store'

  const scene = getContext<Writable<Scene>>('scene')
  const canvas = getContext<Writable<HTMLCanvasElement>>('canvas')

  export let name: string = 'FreeCamera'
  export let position = Vector3.Zero()
  export let setActiveOnSceneIfNoneActive = true
  export let minZ = 0.45
  const parent = getContext<Writable<Mesh>>('object')
  export let viewport: Viewport = new Viewport(0, 0, 1, 0.5)
  export let disableControl = false

  export const getFacingDirection = () =>
    Vector3.Normalize($camera.target.subtract($camera.position))
  export const camera = writable(
    new TargetCamera(name, position, $scene, setActiveOnSceneIfNoneActive),
  )
  setContext('camera', camera)

  onDestroy(() => {
    $camera.dispose()
  })

  $: if ($camera) {
    if (disableControl) {
      $camera.detachControl()
    } else {
      $camera.attachControl()
    }

    $camera.minZ = minZ
    $camera.parent = $parent
    $camera.viewport = viewport
  }

  $: if ($camera === $scene.activeCamera) {
    $camera.attachControl($canvas, false)
  }

  if (setActiveOnSceneIfNoneActive) {
    $scene.activeCamera = $camera
  }
</script>
