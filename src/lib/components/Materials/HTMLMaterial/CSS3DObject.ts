import { Mesh, Scene } from '@babylonjs/core'

export default class CSS3DObject extends Mesh {
  element: HTMLElement
  constructor(element: HTMLElement, scene: Scene) {
    super(element.tagName, scene)
    this.element = element
    this.element.style.position = 'absolute'
    this.element.style.pointerEvents = 'auto'
  }
}
