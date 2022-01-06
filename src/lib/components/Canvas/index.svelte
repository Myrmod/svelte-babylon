<script lang="ts">
  import * as BABYLON from 'babylonjs'
  import type RootContext from '$lib/types'
  import { onMount } from 'svelte'
  import { setRoot } from '../../utils/context'

  // settings
  export let antialiasing = false
  export let engineOptions: BABYLON.EngineOptions = undefined
  export let clearColor: BABYLON.Color4 = new BABYLON.Color4(0, 0, 0)
  export let initialized = false

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
    root.scene.render()
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
