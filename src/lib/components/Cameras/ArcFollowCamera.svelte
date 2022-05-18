<script lang="ts">
  import { ArcFollowCamera } from '@babylonjs/core/Cameras/followCamera.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh.js'
  import type { Scene } from '@babylonjs/core/scene.js'
  import { getContext, onDestroy, onMount, setContext } from 'svelte'
  import { writable, type Writable } from 'svelte/store'

  const scene = getContext<Writable<Scene>>('scene')
  const canvas = getContext<Writable<HTMLCanvasElement>>('canvas')
  const parent = getContext<Writable<AbstractMesh>>('object')

  if (!($parent instanceof AbstractMesh)) {
    throw new Error('ArcFollowCamera requires a parent of AbstractMesh')
  }

  export let name: string = 'ArcFollowCamera'
  export let alpha = -Math.PI / 2
  export let beta = Math.PI / 2
  export let radius = 5
  export let speed = 1
  export let setActiveOnSceneIfNoneActive = true
  export let disableControl = false
  export const getFacingDirection = () =>
    Vector3.Normalize($camera.target.subtract($camera.position))
  export const camera = writable(new ArcFollowCamera(name, alpha, beta, radius, $parent, $scene))
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
  }

  $: if ($camera === $scene.activeCamera) {
    $camera.attachControl($canvas, false)
  }

  if (setActiveOnSceneIfNoneActive) {
    $scene.activeCamera = $camera
  }
</script>
