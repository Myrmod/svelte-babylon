import type * as BABYLON from 'babylonjs'

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
  imports: {
    [key: string]: BABYLON.ISceneLoaderAsyncResult
  }
}
