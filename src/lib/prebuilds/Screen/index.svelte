<!--
  @component
  The Screen component allows you to create a flying static screen on which, via a separate camera, a part of the scene is being rendered. It is recommended to use this component after the main camera.
 -->
<script lang="ts">
  import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera.js'
  import type { Camera } from '@babylonjs/core/Cameras/camera'
  import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js'
  import { RenderTargetTexture } from '@babylonjs/core/Materials/Textures/renderTargetTexture.js'
  import { Color3 } from '@babylonjs/core/Maths/math.color'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
  import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder.js'
  import { onDestroy, onMount } from 'svelte'

  const scene = getContext<Writable<Scene>>('scene')

  let monitor: Mesh
  export let parent: Camera = $scene.activeCamera

  /**
   * Camera for texture creation. We need one to create a texture from.
   */
  let screenCamera: ArcRotateCamera
  $: if (parent) {
    screenCamera = new ArcRotateCamera(
      'ScreenCamera',
      0,
      Math.PI / 4,
      10,
      Vector3.Zero(),
      $scene,
      false,
    )
  }
  onDestroy(() => {
    screenCamera.dispose()
  })

  /**
   * Texture that we want to apply to the material. It is generated using a camera.
   */
  let screenTexture: RenderTargetTexture
  export let size:
    | number
    | {
        width: number
        height: number
        layers?: number
      }
    | {
        ratio: number
      } = {
    width: 1024,
    height: 1024,
  }
  export let generateMipMaps = true
  export let doNotChangeAspectRatio = true

  onMount(() => {
    screenTexture = new RenderTargetTexture(
      'ScreenTexture',
      size,
      $scene,
      generateMipMaps,
      doNotChangeAspectRatio,
    )
    $scene.customRenderTargets.push(screenTexture)
  })
  $: if (screenTexture) {
    screenTexture.activeCamera = screenCamera
    screenTexture.renderList = $scene.meshes
  }
  onDestroy(() => {
    screenTexture.dispose()
  })

  /**
   * Material we want to apply to the plane. The materials texture is created using a camera.
   */
  let screenMaterial: StandardMaterial

  onMount(() => {
    screenMaterial = new StandardMaterial('screenMaterial', $scene)
    screenMaterial.diffuseColor = new Color3(1, 1, 1)
    screenMaterial.diffuseTexture = screenTexture
    screenMaterial.specularColor = Color3.Black()
    screenMaterial.diffuseTexture.level = 1.2
    screenMaterial.emissiveColor = new Color3(1, 1, 1)
  })
  $: if (screenMaterial && monitor) {
    monitor.material = screenMaterial
  }

  onDestroy(() => {
    screenMaterial.dispose()
  })

  /**
   * Plane which uses a material created by a camera texture to create a screen/monitor.
   */
  onMount(() => {
    monitor = MeshBuilder.CreatePlane(
      'Monitor',
      {
        width: 0.5,
        height: 0.5,
      },
      $scene,
    )
  })
  onDestroy(() => {
    monitor.dispose()
  })

  $: if (parent && monitor && $root.canvas.element) {
    monitor.position = new Vector3(
      $root.canvas.element.clientWidth / 2000,
      $root.canvas.element.clientHeight / 2000,
      1.5,
    )
    monitor.parent = parent
  }
</script>
