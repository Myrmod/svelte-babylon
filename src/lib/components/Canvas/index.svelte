<script lang="ts">
  import type RootContext from '$lib/types'
  import { setRoot } from '$lib/utils/context'
  import { Engine } from '@babylonjs/core/Engines/engine.js'
  import type { EngineOptions } from '@babylonjs/core/Engines/thinEngine'
  import { Color4 } from '@babylonjs/core/Maths/math.color'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { AmmoJSPlugin as AmmoJSPluginType } from '@babylonjs/core/Physics/Plugins/ammoJSPlugin'
  import type { CannonJSPlugin as CannonJSPluginType } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin'
  import type { OimoJSPlugin as OimoJSPluginType } from '@babylonjs/core/Physics/Plugins/oimoJSPlugin'
  import { Scene } from '@babylonjs/core/scene.js'
  import { onMount } from 'svelte'

  // settings
  export let antialiasing = false
  export let engineOptions: EngineOptions = undefined
  export let clearColor: Color4 = new Color4(0, 0, 0)
  export let initialized = false
  export let displayLoadingUI = false
  export let enablePointerLockOnClick = false
  export let gravity = new Vector3(0, -9.81, 0)
  export let collisionsEnabled = false
  export let physicsEnabled = false
  /**
   * since we're using es6 modules we have to deal with side effects. The property "enableAnimations" is required if you want to use animations in your scene.
   */
  export let animationsEnabled = false

  let wrapper: HTMLElement
  let canvas: HTMLCanvasElement = undefined

  export let root = setRoot({
    engine: undefined,
    scene: undefined,
    canvas: {
      element: canvas,
      pixelRatio: typeof devicePixelRatio !== 'undefined' ? devicePixelRatio : 1,
    },
    cameras: {},
    lights: {},
    objects: {},
    imports: {},
    gizmos: {},
    gui: {},
    physics: {
      impostors: {},
    },
  } as RootContext)

  onMount(() => {
    init()
  })

  function resize() {
    root.canvas.width = wrapper.clientWidth / root.canvas.pixelRatio
    root.canvas.height = wrapper.clientHeight / root.canvas.pixelRatio
  }

  export let physicsPlugin: AmmoJSPluginType | CannonJSPluginType | OimoJSPluginType = undefined

  async function init() {
    try {
      root.engine = new Engine(canvas, antialiasing, engineOptions)
      root.scene = new Scene(root.engine)
      root.scene.physicsEnabled = false

      // this way we prevent rendering of no camera is active
      root.scene.onBeforeRenderObservable.add((_scene, event) => {
        if (!root.scene.activeCamera) {
          event.skipNextObservers = true
        }
      })

      window.addEventListener('resize', () => {
        root.engine.resize()
      })
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

      initialized = true
    } catch (error) {
      console.error(error)
    }
  }
  $: if (root.scene && root.scene.cameras.length) {
    root.scene.clearColor = clearColor
    root.scene.gravity = gravity
    root.scene.collisionsEnabled = collisionsEnabled

    if (gravity && physicsPlugin && physicsEnabled) {
      root.scene.enablePhysics(root.scene.gravity, physicsPlugin)
      root.scene.physicsEnabled = true
    }

    root.scene.render()
  }

  $: if (root.engine) {
    if (displayLoadingUI) {
      root.engine.displayLoadingUI()
    } else {
      root.engine.hideLoadingUI()
    }
  }

  $: if (root?.scene && enablePointerLockOnClick) {
    root.scene.onPointerDown = e => {
      if (e.button === 0) root.engine.enterPointerlock()
    }
  }

  $: if (canvas) {
    root.canvas.element = canvas
  }
  $: if (wrapper) {
    root.canvas.width = wrapper.clientWidth / root.canvas.pixelRatio
    root.canvas.height = wrapper.clientHeight / root.canvas.pixelRatio
  }
</script>

<svelte:window on:resize={resize} />

<div class="wrapper" bind:this={wrapper}>
  <canvas bind:this={canvas} />

  {#if root.scene}
    <slot />
  {/if}
</div>

<style>
  .wrapper,
  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
</style>
