<script lang="ts">
	import { createReactiveContext } from '$lib/utils/createReactiveContext'
	import { GizmoManager } from '@babylonjs/core/Gizmos/gizmoManager.js'
	import { LightGizmo } from '@babylonjs/core/Gizmos/lightGizmo.js'
	import type { Light } from '@babylonjs/core/Lights/light'
	import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
	import type { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer'
	import type { Scene } from '@babylonjs/core/scene.js'
	import { getContext, onDestroy } from 'svelte'
	import type { Writable } from 'svelte/store'

	const scene = getContext<Writable<Scene>>('scene')
	const parent = getContext<Writable<Light>>('light')

	export let scaleRatio = 1
	export let gizmoLayer: UtilityLayerRenderer = undefined
	export let gizmo = createReactiveContext('gizmo', new LightGizmo(gizmoLayer))

	const gizmoManager = new GizmoManager($scene)
	export let positionGizmoEnabled = true
	export let rotationGizmoEnabled = true
	export let usePointerToAttachGizmos = false

	onDestroy(() => {
		gizmoManager.dispose()
		$gizmo.dispose()
	})

	$: if ($gizmo && $scene.activeCamera && $parent) {
		try {
			gizmoManager.attachToMesh($parent as unknown as AbstractMesh)
			$gizmo.scaleRatio = scaleRatio
			gizmoManager.positionGizmoEnabled = positionGizmoEnabled
			gizmoManager.rotationGizmoEnabled = rotationGizmoEnabled
			gizmoManager.usePointerToAttachGizmos = usePointerToAttachGizmos
		} catch (error) {
			console.warn(error)
		}
	}
</script>
