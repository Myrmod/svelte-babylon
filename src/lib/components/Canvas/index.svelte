<script lang="ts">
	import { createReactiveContext } from '$lib/utils/createReactiveContext'
	import { Engine } from '@babylonjs/core/Engines/engine.js'
	import type { EngineOptions } from '@babylonjs/core/Engines/thinEngine'
	import  { writable, type Writable } from 'svelte/store'

	// settings
	export let antialiasing = false
	export let engineOptions: EngineOptions = undefined
	export let displayLoadingUI = false

	let wrapper: HTMLElement
	export let canvas: HTMLCanvasElement = undefined
	export let  engine: Writable<Engine> = writable()
	$: if (canvas) {
		engine = createReactiveContext('engine', new Engine(canvas, antialiasing, engineOptions))
	}

	$: if ($engine) {
		if (displayLoadingUI) {
			$engine.displayLoadingUI()
		} else {
			$engine.hideLoadingUI()
		}
	}

	$: pixelRatio = typeof devicePixelRatio !== 'undefined' ? devicePixelRatio : 1

	function resize() {
		canvas.width = wrapper.clientWidth / pixelRatio
		canvas.height = wrapper.clientHeight / pixelRatio
	}
</script>

<svelte:window on:resize={resize} />

<div bind:this={wrapper}>
	<canvas bind:this={canvas} />

	{#if $engine}
		<slot />
	{/if}
</div>

<style>
	div,
	canvas {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
</style>
