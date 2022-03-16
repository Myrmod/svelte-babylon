<script lang="ts">
  import type RootContext from '$lib/types'
  import * as BABYLON from 'babylonjs'
  import { Vector3 } from 'babylonjs'
  import { onMount } from 'svelte'
  import { setRoot } from '../../utils/context'

  // settings
  export let antialiasing = false
  export let engineOptions: BABYLON.EngineOptions = undefined
  export let clearColor: BABYLON.Color4 = new BABYLON.Color4(0, 0, 0)
  export let initialized = false
  export let displayLoadingUI = false
  export let enablePointerLockOnClick = false
  export let gravity = 9.81
  export let framesPerSecond = 60
  export let collisionsEnabled = false

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
  } as RootContext)

  onMount(() => {
    init()
  })

  function resize() {
    root.canvas.width = wrapper.clientWidth / root.canvas.pixelRatio
    root.canvas.height = wrapper.clientHeight / root.canvas.pixelRatio
  }

  function init() {
    try {
      root.engine = new BABYLON.Engine(canvas, antialiasing, engineOptions)
      root.scene = new BABYLON.Scene(root.engine)

      window.addEventListener('resize', () => {
        root.engine.resize()
      })

      initialized = true
    } catch (error) {
      console.error(error)
    }
  }

  $: if (root.scene && root.scene.cameras.length) {
    root.scene.clearColor = clearColor
    root.scene.gravity = new Vector3(0, gravity / framesPerSecond, 0)
    root.scene.collisionsEnabled = collisionsEnabled

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
