import type * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'

export default interface RootContext {
  canvas: {
    element: HTMLCanvasElement
    width: number
    height: number
    pixelRatio: number
  }
  scene: BABYLON.Scene
  engine: BABYLON.Engine
  cameras: {
    [key: string]: BABYLON.TargetCamera
  }
  lights: {
    [key: string]: BABYLON.Light
  }
  objects: {
    [key: string]: {
      self: BABYLON.Mesh | BABYLON.AbstractMesh
      [key: string]: unknown
    }
  }
  gui: {
    [key: string]: {
      self: GUI.AdvancedDynamicTexture
      controls: {
        [key: string]: GUI.Control
      }
    }
  }
  imports: {
    [key: string]: BABYLON.ISceneLoaderAsyncResult
  }
  gizmos: {
    [key: string]: BABYLON.Gizmo | BABYLON.GizmoManager
  }
}
