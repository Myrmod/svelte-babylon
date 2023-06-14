<script lang="ts">
	import { AxisDragGizmo } from '@babylonjs/core/Gizmos/axisDragGizmo.js'
	import type { PositionGizmo } from '@babylonjs/core/Gizmos/positionGizmo.js'
	import type { Color3 } from '@babylonjs/core/Maths/math.color'
	import type { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import type { UtilityLayerRenderer } from '@babylonjs/core/Rendering/utilityLayerRenderer'
	import { getContext, onDestroy } from 'svelte'
	import type { Writable } from 'svelte/store'

	const parent = getContext<Writable<PositionGizmo>>('gizmo')

	export let dragAxis: Vector3
	export let color: Color3 = undefined
	export let gizmoLayer: UtilityLayerRenderer = undefined
	export let thickness: number = undefined

	export const gizmo = new AxisDragGizmo(dragAxis, color, gizmoLayer, $parent, thickness)

	onDestroy(() => {
		gizmo.dispose()
	})
</script>
