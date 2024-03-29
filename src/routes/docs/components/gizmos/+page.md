---
title: Gizmos
description: Gizmo.js's are objects that can be attached to a node (mesh, bone, transform) to provide interaction. The GizmoManager and BoundingBox gizmo work with mesh. Whereas Position, scale and rotation gizmos are also usable with TransformNodes and Bones.
---

Gizmo.js's are objects that can be attached to a node (mesh, bone, transform) to provide interaction. The GizmoManager and BoundingBox gizmo work with mesh. Whereas Position, scale and rotation gizmos are also usable with TransformNodes and Bones.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/gizmo)

## GizmoManager

To get a default gizmo setup, the GizmoManager class can be used. The GizmoManager will attach the enabled gizmo to whatever object in the scene that is selected by a pointer. To enable simply add it inside of an object.

It has all basic gizmo types at enabled by default.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/gizmo#gizmomanager)

### Example Code

```svelte
<script lang="ts">
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import GizmoManager from 'svelte-babylon/components/Gizmos/GizmoManager/index.svelte'
</script>

...
<Box>
	<GizmoManager />
</Box>
...
```

## AxisDragGizmo

The AxisDragGizmo allows you to drag an object along the specified axis.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/gizmo#position-scale-and-rotation-gizmos)

## AxisScaleGizmo

The AxisScaleGizmo allows you to scale an object along the specified axis.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/gizmo#position-scale-and-rotation-gizmos)

## BoundingBoxGizmo

The BoundingBoxGizmo displays a bounding box around an object as well as controls to rotate and scale the object.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/gizmo#bounding-box-gizmo)

## CameraGizmo

Gizmo that enables viewing a camera, as well as rotating and moving it.

[BabylonJS reference](https://doc.babylonjs.com/typedoc/classes/babylon.cameragizmo)

## LightGizmo

Gizmo that enables viewing a light, as well as rotating and moving it.

[BabylonJS reference](https://doc.babylonjs.com/typedoc/classes/babylon.lightgizmo)

## PlaneDragGizmo

This Gizmo allows you to drag an object across a two axes.

[BabylonJS reference](https://doc.babylonjs.com/typedoc/classes/babylon.planedraggizmo)

## PlaneRotationGizmo

The PlaneRotationGizmo allows you to rotate an object around the specified axis.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/gizmo#position-scale-and-rotation-gizmos)

## PositionGizmo

The PositionGizmo allows you to move an object across all axes.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/gizmo#position-scale-and-rotation-gizmos)

## RotationGizmo

The RotationGizmo allows you to rotate an object around all axes.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/gizmo#position-scale-and-rotation-gizmos)

## ScaleGizmo

The ScaleGizmo allows you to scale an object along all axes.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/mesh/gizmo#position-scale-and-rotation-gizmos)
