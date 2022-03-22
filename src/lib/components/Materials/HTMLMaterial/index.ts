import type RootContext from '$lib/types'
import * as BABYLON from 'babylonjs'
import CSS3DObject from './CSS3DObject'

export default function run(plane: BABYLON.Mesh, root: RootContext) {
  const cssObject = createCSSobject(
    plane,
    root.scene,
    'qgKbpe4qvno',
    setupRenderer(root.canvas.element),
  )
  createMaskingScreen(plane, root.scene)
}

function setupRenderer(canvas: HTMLCanvasElement) {
  let container = document.createElement('div')
  container.id = 'css-container'
  container.style.position = 'absolute'
  container.style.width = '100%'
  container.style.height = '100%'
  container.style.zIndex = '-1'

  let renderer = new CSS3DRenderer()
  container.appendChild(renderer.domElement)
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)

  window.addEventListener('resize', () => {
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
  })

  return renderer
}

function createCSSobject(
  mesh: BABYLON.Mesh,
  scene: BABYLON.Scene,
  videoID: string,
  renderer: CSS3DRenderer,
) {
  let width = 480
  let height = 360
  scene.onBeforeRenderObservable.add(() => {
    renderer.render(scene, scene.activeCamera)
  })
  var div = document.createElement('div')
  div.style.width = width + 'px'
  div.style.height = height + 'px'
  div.style.backgroundColor = 'red'
  var CSSobject = new CSS3DObject(div, scene)
  CSSobject.position.copyFrom(mesh.getAbsolutePosition())
  CSSobject.rotation.y = -mesh.rotation.y
  CSSobject.scaling.copyFrom(mesh.scaling)

  // var iframe = document.createElement('iframe')
  // iframe.id = 'video-' + videoID
  // iframe.style.width = width + 'px'
  // iframe.style.height = height + 'px'
  // iframe.style.border = '0px'
  // iframe.allow = 'autoplay'
  // iframe.src = [
  //   'https://www.youtube.com/embed/',
  //   videoID,
  //   '?rel=0&enablejsapi=1&disablekb=1&autoplay=1&controls=0&fs=0&modestbranding=1',
  // ].join('')
  // div.appendChild(iframe)

  return CSSobject
}

function createMaskingScreen(maskMesh: BABYLON.Mesh, scene: BABYLON.Scene) {
  let depthMask = new BABYLON.StandardMaterial('matDepthMask', scene)
  depthMask.backFaceCulling = false

  maskMesh.material = depthMask

  maskMesh.onBeforeRenderObservable.add(() => scene.getEngine().setColorWrite(false))
  maskMesh.onAfterRenderObservable.add(() => scene.getEngine().setColorWrite(true))

  // swap meshes to put mask first
  var mask_index = scene.meshes.indexOf(maskMesh)
  scene.meshes[mask_index] = scene.meshes[0]
  scene.meshes[0] = maskMesh
}
