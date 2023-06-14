<script lang="ts">
	import { createReactiveContext } from '$lib/utils/createReactiveContext'
	import { GizmoManager } from '@babylonjs/core/Gizmos/gizmoManager.js'
	import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
	import type { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer'
	import type { Scene } from '@babylonjs/core/scene.js'
	import { getContext, onDestroy, onMount } from 'svelte'
	import type { Writable } from 'svelte/types/runtime/store'

	const scene = getContext<Writable<Scene>>('scene')
	const parent = getContext<Writable<Mesh>>('object')

	export let thickness: number = undefined
	export let utilityLayer: UtilityLayerRenderer = undefined
	export let keepDepthUtilityLayer: UtilityLayerRenderer = undefined
	export let positionGizmoEnabled = true
	export let rotationGizmoEnabled = true
	export let scaleGizmoEnabled = true
	export let boundingBoxGizmoEnabled = true
	export let usePointerToAttachGizmos = false

	export const gizmo = createReactiveContext(
		'gizmo',
		new GizmoManager($scene, thickness, utilityLayer, keepDepthUtilityLayer),
	)

	onMount(() => {
		try {
			if (!parent) {
				console.error('no parent object found')

				return
			}

			$gizmo.attachToMesh($parent)
		} catch (error) {
			console.error(error)
		}
	})

	onDestroy(() => {
		$gizmo.dispose()
	})

	$: if ($gizmo) {
		$gizmo.positionGizmoEnabled = positionGizmoEnabled
		$gizmo.rotationGizmoEnabled = rotationGizmoEnabled
		$gizmo.scaleGizmoEnabled = scaleGizmoEnabled
		$gizmo.boundingBoxGizmoEnabled = boundingBoxGizmoEnabled
		$gizmo.usePointerToAttachGizmos = usePointerToAttachGizmos
	}
</script>
