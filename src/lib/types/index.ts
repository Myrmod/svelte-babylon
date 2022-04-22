import type { TargetCamera } from '@babylonjs/core/Cameras/targetCamera.js'
import type { Engine } from '@babylonjs/core/Engines/engine.js'
import type { Gizmo } from '@babylonjs/core/Gizmos/Gizmo.js'
import type { GizmoManager } from '@babylonjs/core/Gizmos/gizmoManager.js'
import type { Light } from '@babylonjs/core/Lights/light'
import type { ISceneLoaderAsyncResult } from '@babylonjs/core/Loading/sceneLoader.js'
import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
import type { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor.js'
import type { Scene } from '@babylonjs/core/scene.js'
import type { AdvancedDynamicTexture, Control } from '@babylonjs/gui'

export default interface RootContext {
  canvas: {
    element: HTMLCanvasElement
    width: number
    height: number
    pixelRatio: number
  }
  scene: Scene
  engine: Engine
  cameras: {
    [key: string]: TargetCamera
  }
  lights: {
    [key: string]: Light
  }
  objects: {
    [key: string]: {
      self: Mesh | AbstractMesh
      [key: string]: unknown
    }
  }
  gui: {
    [key: string]: {
      self: AdvancedDynamicTexture
      controls: {
        [key: string]: Control
      }
    }
  }
  imports: {
    [key: string]: ISceneLoaderAsyncResult
  }
  gizmos: {
    [key: string]: Gizmo | GizmoManager
  }
  physics: {
    impostors: {
      [key: string]: PhysicsImpostor
    }
  }
}
