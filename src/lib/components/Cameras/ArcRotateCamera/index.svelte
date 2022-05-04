<script lang="ts">
  import type { ActionEvent } from '@babylonjs/core/Actions/actionEvent'
  import { Animation } from '@babylonjs/core/Animations/animation.js'
  import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { Scene } from '@babylonjs/core/scene.js'
  import { getContext, onDestroy, setContext } from 'svelte'
  import { writable, type Writable } from 'svelte/store'

  const scene = getContext<Writable<Scene>>('scene')
  const canvas = getContext<Writable<HTMLCanvasElement>>('canvas')

  export let name: string = 'ArcRotateCamera'
  export let target = Vector3.Zero()
  export let alpha = -Math.PI / 2
  export let beta = Math.PI / 2
  export let radius = 5
  export let setActiveOnSceneIfNoneActive = true
  export let speed = 1
  export let disableControl = false
  export const camera = writable(
    new ArcRotateCamera(name, alpha, beta, radius, target, $scene, setActiveOnSceneIfNoneActive),
  )
  setContext('camera', camera)

  // Helper functions
  export const getFacingDirection = () =>
    Vector3.Normalize($camera.target.subtract($camera.position))
  export const moveCamera = (alpha = 0, beta = 0, fps = 60, totalFrames = 60) => {
    const alphaAnim = new Animation(
      'alphaAnim',
      'alpha',
      fps,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT,
    )
    const betaAnim = new Animation(
      'betaAnim',
      'beta',
      fps,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT,
    )

    const alphaKeys = [
      { frame: 0, value: $camera.alpha },
      { frame: totalFrames, value: alpha },
    ]
    const betaKeys = [
      { frame: 0, value: $camera.beta },
      { frame: totalFrames, value: beta },
    ]

    alphaAnim.setKeys(alphaKeys)
    betaAnim.setKeys(betaKeys)

    $camera.animations.push(alphaAnim)
    $camera.animations.push(betaAnim)
    $camera._scene.beginAnimation(camera, 0, totalFrames, false)
  }
  export const rotateToFacePickedFace = async (
    e: ActionEvent,
    radius = 5,
    fps = 60,
    totalFrames = 60,
    onAnimationEnd = undefined,
  ) => {
    try {
      if ($scene.beginDirectAnimation === undefined) {
        await import('@babylonjs/core/Animations/animatable')
      }
      const mesh = e.meshUnderPointer
      const vector = mesh.getFacetNormal(e.additionalData.faceId)
      const origin = mesh.getFacetPosition(e.additionalData.faceId)
      const newPosition = origin.add(vector.multiplyByFloats(radius, radius, radius))

      Animation.CreateAndStartAnimation(
        'anim',
        camera,
        'position',
        fps,
        totalFrames,
        $camera.position.clone(),
        newPosition,
        Animation.ANIMATIONLOOPMODE_CONSTANT,
        undefined,
        onAnimationEnd,
      )
    } catch (error) {
      console.error(error)
    }
  }

  onDestroy(() => {
    $camera?.dispose()
  })

  $: if ($camera) {
    if (disableControl) {
      $camera.detachControl()
    } else {
      $camera.attachControl()
    }

    $camera.speed = speed
    $camera.alpha = alpha
    $camera.beta = beta
  }

  $: if ($camera === $scene.activeCamera) {
    $camera.attachControl($canvas, false)
  }

  if (setActiveOnSceneIfNoneActive) {
    $scene.activeCamera = $camera
  }
</script>
