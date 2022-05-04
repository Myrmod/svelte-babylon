<script lang="ts">
  import type { Engine } from '@babylonjs/core/Engines/engine.js'
  import { Color3, Color4 } from '@babylonjs/core/Maths/math.color'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { AmmoJSPlugin as AmmoJSPluginType } from '@babylonjs/core/Physics/Plugins/ammoJSPlugin'
  import type { CannonJSPlugin as CannonJSPluginType } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin'
  import type { OimoJSPlugin as OimoJSPluginType } from '@babylonjs/core/Physics/Plugins/oimoJSPlugin'
  import { Scene, type SceneOptions } from '@babylonjs/core/scene.js'
  import { getContext, onMount, setContext } from 'svelte'
  import { writable, type Writable } from 'svelte/store'

  // settings
  export let sceneOptions: SceneOptions = undefined
  export let clearColor: Color4 | Color3 = new Color4(0, 0, 0)
  export let enablePointerLockOnClick = false
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
  export let scene = writable(new Scene($engine, sceneOptions))
  $scene.onBeforeRenderObservable.add((_scene, event) => {
    if (!$scene.activeCamera) {
      event.skipNextObservers = true
    }
  })
  $scene.physicsEnabled = false
  setContext('scene', scene)

  onMount(async () => {
    try {
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

  $: if ($scene && enablePointerLockOnClick) {
    $scene.onPointerDown = e => {
      if (e.button === 0) $engine.enterPointerlock()
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
