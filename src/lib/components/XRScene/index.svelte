<!-- @component
An implementation of https://doc.babylonjs.com/divingDeeper/webXR/webXRExperienceHelpers
 -->
<script lang="ts">
  import { createReactiveContext } from '$lib/utils/createReactiveContext'
  import type {
    AbstractMesh,
    WebXRDefaultExperience,
    WebXRDefaultExperienceOptions,
  } from '@babylonjs/core'
  import type { Engine } from '@babylonjs/core/Engines/engine.js'
  import { Color3, Color4 } from '@babylonjs/core/Maths/math.color'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { AmmoJSPlugin as AmmoJSPluginType } from '@babylonjs/core/Physics/Plugins/ammoJSPlugin'
  import type { CannonJSPlugin as CannonJSPluginType } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin'
  import type { OimoJSPlugin as OimoJSPluginType } from '@babylonjs/core/Physics/Plugins/oimoJSPlugin'
  import { Scene, type SceneOptions } from '@babylonjs/core/scene.js'
  import { getContext, onMount } from 'svelte'
  import type { Writable } from 'svelte/store'

  // settings
  export let sceneOptions: SceneOptions = undefined
  export let clearColor: Color4 | Color3 = new Color4(0, 0, 0)
  export let gravity = new Vector3(0, -9.81, 0)
  export let collisionsEnabled = false
  export let physicsEnabled = false
  export let autoClear = true
  export let inactive = false
  export let updateCameras = true
  export let ignoreAnimations = false
  export let physicsPlugin: AmmoJSPluginType | CannonJSPluginType | OimoJSPluginType = undefined
  /**
   * since we're using es6 modules we have to deal with side effects. The property "animationsEnabled" is usually required if you want to use animations in your scene. Some components are able to catch the potential error though.
   */
  export let animationsEnabled = false

  const engine = getContext<Writable<Engine>>('engine')
  export let scene = createReactiveContext('scene', new Scene($engine, sceneOptions))
  $scene.onBeforeRenderObservable.add((_scene, event) => {
    if (!$scene.activeCamera) {
      event.skipNextObservers = true
    }
  })
  $scene.physicsEnabled = false

  export let xrHelper = createReactiveContext<WebXRDefaultExperience>('xrHelper', undefined)
  export let options: WebXRDefaultExperienceOptions = undefined
  onMount(async () => {
    try {
      // polyfill
      await new Promise(resolve => {
        if (navigator.xr) {
          return resolve()
        }
        if (window.WebXRPolyfill) {
          new WebXRPolyfill()
          return resolve()
        } else {
          const url = 'https://cdn.jsdelivr.net/npm/webxr-polyfill@latest/build/webxr-polyfill.js'
          const s = document.createElement('script')
          s.src = url
          document.head.appendChild(s)
          s.onload = () => {
            new WebXRPolyfill()
            resolve()
          }
        }
      })

      await import('@babylonjs/core/Materials/Node/Blocks')
      await import('@babylonjs/core/Helpers/sceneHelpers.js')

      $xrHelper = await $scene.createDefaultXRExperienceAsync(options)

      if ($xrHelper.baseExperience) {
        await import('@babylonjs/loaders/glTF')
      }

      if (animationsEnabled) {
        await import('@babylonjs/core/Animations/animatable')
      }
      if (collisionsEnabled) {
        await import('@babylonjs/core/Collisions/collisionCoordinator')
      }
      if (physicsEnabled && !physicsPlugin) {
        const { CannonJSPlugin } = await import('@babylonjs/core/Physics/Plugins/cannonJSPlugin')
        physicsPlugin = new CannonJSPlugin(true, 10, await import('cannon'))
      }
    } catch (error) {
      console.error(error)
    }
  })

  // handle floor meshes
  export let floorMeshes: Array<AbstractMesh> = undefined
  export const activeFloorMeshes: Array<AbstractMesh> = []
  let floorMeshesToRemove: Array<AbstractMesh> = []
  $: if ($xrHelper?.baseExperience) {
    floorMeshes?.forEach(floorMesh => {
      if (activeFloorMeshes.includes(floorMesh)) {
        return
      }
      activeFloorMeshes.push(floorMesh)
      $xrHelper.teleportation.addFloorMesh(floorMesh)
    })
    floorMeshesToRemove = activeFloorMeshes.filter(
      activeFloorMesh => !floorMeshes?.includes(activeFloorMesh),
    )
  }
  $: if ($xrHelper?.baseExperience && floorMeshesToRemove.length) {
    floorMeshesToRemove.forEach(floorMesh => $xrHelper.teleportation.removeFloorMesh(floorMesh))
    floorMeshesToRemove = []
  }

  // handle blocker meshes
  export let blockerMeshes: Array<AbstractMesh> = undefined
  export const activeBlockerMeshes: Array<AbstractMesh> = []
  let blockerMeshesToRemove: Array<AbstractMesh> = []
  $: if ($xrHelper?.baseExperience) {
    blockerMeshes?.forEach(blockerMesh => {
      if (activeBlockerMeshes.includes(blockerMesh)) {
        return
      }
      activeBlockerMeshes.push(blockerMesh)
      $xrHelper.teleportation.addBlockerMesh(blockerMesh)
    })
    blockerMeshesToRemove = activeBlockerMeshes.filter(
      activeBlockerMesh => !blockerMeshes?.includes(activeBlockerMesh),
    )
  }
  $: if ($xrHelper?.baseExperience && blockerMeshesToRemove.length) {
    blockerMeshesToRemove.forEach(blockerMesh =>
      $xrHelper.teleportation.removeBlockerMesh(blockerMesh),
    )
    blockerMeshesToRemove = []
  }

  // handle snap points
  export let snapPoints: Array<Vector3> = undefined
  export const activeSnapPoints: Array<Vector3> = []
  let snapPointsToRemove: Array<Vector3> = []
  $: if ($xrHelper?.baseExperience) {
    snapPoints?.forEach(snapPoint => {
      if (activeSnapPoints.includes(snapPoint)) {
        return
      }
      activeSnapPoints.push(snapPoint)
      $xrHelper.teleportation.addSnapPoint(snapPoint)
    })
    snapPointsToRemove = activeSnapPoints.filter(
      activeBlockerMesh => !snapPoints?.includes(activeBlockerMesh),
    )
  }
  $: if ($xrHelper?.baseExperience && snapPointsToRemove.length) {
    snapPointsToRemove.forEach(snapPoint => $xrHelper.teleportation.removeSnapPoint(snapPoint))
    snapPointsToRemove = []
  }

  // general stuff
  $: if ($scene && $scene.cameras.length) {
    $scene.clearColor =
      clearColor instanceof Color3
        ? new Color4(clearColor.r, clearColor.g, clearColor.b, 1)
        : clearColor
    $scene.gravity = gravity
    $scene.collisionsEnabled = collisionsEnabled
    $scene.autoClear = autoClear

    if (gravity && physicsPlugin && physicsEnabled) {
      $scene.enablePhysics($scene.gravity, physicsPlugin)
      $scene.physicsEnabled = true
    }
  }

  $: renderFunction = () => {
    if ($scene.activeCamera) {
      $scene.render(updateCameras, ignoreAnimations)
    }
  }
  $: if ($engine) {
    inactive ? $engine.stopRenderLoop(renderFunction) : $engine.runRenderLoop(renderFunction)
  }
</script>

{#if $scene}
  <slot />
{/if}
