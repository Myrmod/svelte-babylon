import type {
  AbstractMesh,
  Engine,
  Gizmo,
  GizmoManager,
  ISceneLoaderAsyncResult,
  Light,
  Mesh,
  PhysicsImpostor,
  Scene,
  TargetCamera,
} from '@babylonjs/core'
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
