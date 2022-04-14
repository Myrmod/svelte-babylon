import type { TargetCamera } from '@babylonjs/core/Cameras/targetCamera'
import type { Engine } from '@babylonjs/core/Engines/engine'
import type { Gizmo } from '@babylonjs/core/Gizmos/gizmo'
import type { GizmoManager } from '@babylonjs/core/Gizmos/gizmoManager'
import type { Light } from '@babylonjs/core/Lights/light'
import type { ISceneLoaderAsyncResult } from '@babylonjs/core/Loading/sceneLoader'
import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
import type { Mesh } from '@babylonjs/core/Meshes/mesh'
import type { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor'
import type { Scene } from '@babylonjs/core/scene'
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
