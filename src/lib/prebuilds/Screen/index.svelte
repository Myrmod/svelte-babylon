<!--
  @component
  The Screen component allows you to create a flying static screen on which, via a separate camera, a part of the scene is being rendered. It is recommended to use this component after the main camera.
 -->
<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import {
    ArcRotateCamera,
    Camera,
    Color3,
    Mesh,
    MeshBuilder,
    RenderTargetTexture,
    StandardMaterial,
    Vector3,
  } from '@babylonjs/core'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  let monitor: Mesh
  export let parent: Camera = root.scene.activeCamera

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
      root.scene,
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
      root.scene,
      generateMipMaps,
      doNotChangeAspectRatio,
    )
    root.scene.customRenderTargets.push(screenTexture)
  })
  $: if (screenTexture) {
    screenTexture.activeCamera = screenCamera
    screenTexture.renderList = root.scene.meshes
  }
  onDestroy(() => {
    screenTexture.dispose()
  })

  /**
   * Material we want to apply to the plane. The materials texture is created using a camera.
   */
  let screenMaterial: StandardMaterial

  onMount(() => {
    screenMaterial = new StandardMaterial('screenMaterial', root.scene)
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
      root.scene,
    )
  })
  onDestroy(() => {
    monitor.dispose()
  })

  $: if (parent && monitor && root.canvas.element) {
    monitor.position = new Vector3(
      root.canvas.element.clientWidth / 1100,
      root.canvas.element.clientHeight / 2000,
      1.5,
    )
    monitor.parent = parent
  }
</script>
