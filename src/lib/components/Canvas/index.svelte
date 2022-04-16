<script lang="ts">
  import { setRoot } from '$lib/utils/context'
  import { Engine } from '@babylonjs/core/Engines/engine'
  import type { EngineOptions } from '@babylonjs/core/Engines/thinEngine'
  import { Color4 } from '@babylonjs/core/Maths/math.color'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { AmmoJSPlugin } from '@babylonjs/core/Physics/Plugins/ammoJSPlugin'
  import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin'
  import type { OimoJSPlugin } from '@babylonjs/core/Physics/Plugins/oimoJSPlugin'
  import { Scene } from '@babylonjs/core/scene'
  import { onMount } from 'svelte'
  import type RootContext from 'svelte-babylon/types'

  // settings
  export let antialiasing = false
  export let engineOptions: EngineOptions = undefined
  export let clearColor: Color4 = new Color4(0, 0, 0)
  export let initialized = false
  export let displayLoadingUI = false
  export let enablePointerLockOnClick = false
  export let gravity = -9.81
  export let framesPerSecond = 60
  export let collisionsEnabled = false
  export let physicsEnabled = false

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

  export let physicsPlugin: AmmoJSPlugin | CannonJSPlugin | OimoJSPlugin = undefined

  async function init() {
    try {
      root.engine = new Engine(canvas, antialiasing, engineOptions)
      root.scene = new Scene(root.engine)

      // this way we prevent rendering of no camera is active
      root.scene.onBeforeRenderObservable.add((_scene, event) => {
        if (!root.scene.activeCamera) {
          event.skipNextObservers = true
        }
      })

      window.addEventListener('resize', () => {
        root.engine.resize()
      })

      if (physicsEnabled && !physicsPlugin) {
        physicsPlugin = new CannonJSPlugin(true, 10, await import('cannon'))
      }

      initialized = true
    } catch (error) {
      console.error(error)
    }
  }

  $: if (root.scene && root.scene.cameras.length) {
    root.scene.clearColor = clearColor
    root.scene.gravity = new Vector3(0, gravity / framesPerSecond, 0)
    root.scene.collisionsEnabled = collisionsEnabled
    root.scene.physicsEnabled = physicsEnabled

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
