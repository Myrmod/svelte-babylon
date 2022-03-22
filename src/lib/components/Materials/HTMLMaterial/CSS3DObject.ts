import * as BABYLON from 'babylonjs'

export default class CSS3DObject extends BABYLON.Mesh {
  element: HTMLElement
  constructor(element: HTMLElement, scene: BABYLON.Scene) {
    super(element.tagName, scene)
    this.element = element
    this.element.style.position = 'absolute'
    this.element.style.pointerEvents = 'auto'
  }
}
