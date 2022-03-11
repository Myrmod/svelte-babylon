<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let name: string = 'ArcRotateCamera'
  export let target = BABYLON.Vector3.Zero()
  export let alpha = -Math.PI / 2
  export let beta = Math.PI / 2
  export let radius = 5
  export let setActiveOnSceneIfNoneActive = true
  export let speed = 1
  export const camera = new BABYLON.ArcRotateCamera(
    name,
    alpha,
    beta,
    radius,
    target,
    root.scene,
    setActiveOnSceneIfNoneActive,
  )

  // Helper functions
  export const getFacingDirection = () =>
    BABYLON.Vector3.Normalize(camera.target.subtract(camera.position))
  export const moveCamera = (alpha = 0, beta = 0, fps = 60, totalFrames = 60) => {
    const alphaAnim = new BABYLON.Animation(
      'alphaAnim',
      'alpha',
      fps,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
    )
    const betaAnim = new BABYLON.Animation(
      'betaAnim',
      'beta',
      fps,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
    )

    const alphaKeys = [
      { frame: 0, value: camera.alpha },
      { frame: totalFrames, value: alpha },
    ]
    const betaKeys = [
      { frame: 0, value: camera.beta },
      { frame: totalFrames, value: beta },
    ]

    alphaAnim.setKeys(alphaKeys)
    betaAnim.setKeys(betaKeys)

    camera.animations.push(alphaAnim)
    camera.animations.push(betaAnim)
    camera._scene.beginAnimation(camera, 0, totalFrames, false)
  }
  export const rotateToFacePickedFace = (
    e: BABYLON.ActionEvent,
    radius = 5,
    fps = 60,
    totalFrames = 60,
    onAnimationEnd = undefined,
  ) => {
    try {
      const mesh = e.meshUnderPointer
      const vector = mesh.getFacetNormal(e.additionalData.faceId)
      const origin = mesh.getFacetPosition(e.additionalData.faceId)
      const newPosition = origin.add(vector.multiplyByFloats(radius, radius, radius))

      BABYLON.Animation.CreateAndStartAnimation(
        'anim',
        camera,
        'position',
        fps,
        totalFrames,
        camera.position.clone(),
        newPosition,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
        undefined,
        onAnimationEnd,
      )
    } catch (error) {
      console.error(error)
    }
  }

  onMount(() => {
    try {
      if (root.cameras[camera.id]) {
        throw new Error('There can only be one camera with the same name')
      }

      root.cameras[camera.id] = camera

      root.cameras[camera.id].attachControl(root.canvas.element, false)

      root.engine.runRenderLoop(() => {
        root.scene.render()
      })
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    root.cameras[camera.id] = null
  })

  $: if (root.cameras[camera.id]) {
    camera.speed = speed
    camera.alpha = alpha
    camera.beta = beta

    root.scene.render()
  }
</script>
