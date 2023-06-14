<script lang="ts">
	import { createReactiveContext } from '$lib/utils/createReactiveContext'
	import type { Mesh } from '@babylonjs/core'
	import { GizmoManager } from '@babylonjs/core/Gizmos/gizmoManager.js'
	import { RotationGizmo, type RotationGizmoOptions } from '@babylonjs/core/Gizmos/rotationGizmo.js'
	import type { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer'
	import type { Scene } from '@babylonjs/core/scene.js'
	import { getContext, onDestroy } from 'svelte'
	import type { Writable } from 'svelte/types/runtime/store'

	const scene = getContext<Writable<Scene>>('scene')
	const parent = getContext<Writable<Mesh>>('object')

	export let gizmoLayer: UtilityLayerRenderer = undefined
	export let tessellation: number = undefined
	export let useEulerRotation: boolean = undefined
	export let thickness: number = undefined
	export let options: RotationGizmoOptions = undefined
	export let positionGizmoEnabled = true
	export let rotationGizmoEnabled = true
	export let usePointerToAttachGizmos = false
	export let scaleRatio = 1
	export const gizmoManager = new GizmoManager($scene)

	export const gizmo = createReactiveContext(
		'RotationGizmo',
		new RotationGizmo(gizmoLayer, tessellation, useEulerRotation, thickness, gizmoManager, options),
	)

	onDestroy(() => {
		gizmoManager.dispose()
		$gizmo.dispose()
	})

	$: if ($gizmo && $scene.activeCamera && $parent) {
		try {
			gizmoManager.attachToMesh($parent)
			$gizmo.scaleRatio = scaleRatio
			gizmoManager.positionGizmoEnabled = positionGizmoEnabled
			gizmoManager.rotationGizmoEnabled = rotationGizmoEnabled
			gizmoManager.usePointerToAttachGizmos = usePointerToAttachGizmos
		} catch (error) {
			console.warn(error)
		}
	}
</script>
