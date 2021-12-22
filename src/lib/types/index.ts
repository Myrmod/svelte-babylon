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
    [key: string]: BABYLON.Camera
  }
  lights: {
    [key: string]: BABYLON.Light
  }
  objects: {
    [key: string]: BABYLON.Mesh
  }
}
