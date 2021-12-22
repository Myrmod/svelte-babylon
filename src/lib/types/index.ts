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
    [key: string]: {
      self: BABYLON.TargetCamera
      [key: string]: unknown
    }
  }
  lights: {
    [key: string]: {
      self: BABYLON.Light
      [key: string]: unknown
    }
  }
  objects: {
    [key: string]: {
      self: BABYLON.Mesh
      [key: string]: unknown
    }
  }
}
