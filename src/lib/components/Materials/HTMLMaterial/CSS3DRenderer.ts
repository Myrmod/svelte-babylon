import { AbstractMesh, Camera, Matrix, Scene } from '@babylonjs/core'
import CSS3DObject from './CSS3DObject'

export default class CSS3DRenderer {
  domElement: HTMLElement
  cache: { camera: { fov: number; style: string }; objects: WeakMap<object, any> }
  cameraElement: HTMLDivElement
  isIE: boolean
  width: number
  height: number
  widthHalf: number
  heightHalf: number

  constructor() {
    this.cache = {
      camera: { fov: 0, style: '' },
      objects: new WeakMap(),
    }

    var domElement = document.createElement('div')
    domElement.style.overflow = 'hidden'

    this.domElement = domElement
    this.cameraElement = document.createElement('div')
    this.isIE =
      !!document['documentMode'] ||
      /Edge/.test(navigator.userAgent) ||
      /Edg/.test(navigator.userAgent)

    if (!this.isIE) {
      this.cameraElement.style.webkitTransformStyle = 'preserve-3d'
      this.cameraElement.style.transformStyle = 'preserve-3d'
    }
    this.cameraElement.style.pointerEvents = 'none'

    domElement.appendChild(this.cameraElement)
  }

  getSize() {
    return {
      width: this.width,
      height: this.height,
    }
  }

  setSize(width: number, height: number) {
    this.width = width
    this.height = height
    this.widthHalf = this.width / 2
    this.heightHalf = this.height / 2

    this.domElement.style.width = width + 'px'
    this.domElement.style.height = height + 'px'

    this.cameraElement.style.width = width + 'px'
    this.cameraElement.style.height = height + 'px'
  }

  epsilon(value: number) {
    return Math.abs(value) < 1e-10 ? 0 : value
  }

  getCameraCSSMatrix(matrix) {
    console.log('getCameraCSSMatrix')

    var elements = matrix.m

    return (
      'matrix3d(' +
      this.epsilon(elements[0]) +
      ',' +
      this.epsilon(-elements[1]) +
      ',' +
      this.epsilon(elements[2]) +
      ',' +
      this.epsilon(elements[3]) +
      ',' +
      this.epsilon(elements[4]) +
      ',' +
      this.epsilon(-elements[5]) +
      ',' +
      this.epsilon(elements[6]) +
      ',' +
      this.epsilon(elements[7]) +
      ',' +
      this.epsilon(elements[8]) +
      ',' +
      this.epsilon(-elements[9]) +
      ',' +
      this.epsilon(elements[10]) +
      ',' +
      this.epsilon(elements[11]) +
      ',' +
      this.epsilon(elements[12]) +
      ',' +
      this.epsilon(-elements[13]) +
      ',' +
      this.epsilon(elements[14]) +
      ',' +
      this.epsilon(elements[15]) +
      ')'
    )
  }

  getObjectCSSMatrix(matrix, cameraCSSMatrix) {
    console.log('getObjectCSSMatrix')

    var elements = matrix.m
    var matrix3d =
      'matrix3d(' +
      this.epsilon(elements[0]) +
      ',' +
      this.epsilon(elements[1]) +
      ',' +
      this.epsilon(elements[2]) +
      ',' +
      this.epsilon(elements[3]) +
      ',' +
      this.epsilon(-elements[4]) +
      ',' +
      this.epsilon(-elements[5]) +
      ',' +
      this.epsilon(-elements[6]) +
      ',' +
      this.epsilon(-elements[7]) +
      ',' +
      this.epsilon(elements[8]) +
      ',' +
      this.epsilon(elements[9]) +
      ',' +
      this.epsilon(elements[10]) +
      ',' +
      this.epsilon(elements[11]) +
      ',' +
      this.epsilon(elements[12]) +
      ',' +
      this.epsilon(elements[13]) +
      ',' +
      this.epsilon(elements[14]) +
      ',' +
      this.epsilon(elements[15]) +
      ')'

    if (this.isIE) {
      return (
        'translate(-50%,-50%)' +
        'translate(' +
        this.widthHalf +
        'px,' +
        this.heightHalf +
        'px)' +
        cameraCSSMatrix +
        matrix3d
      )
    }
    return 'translate(-50%,-50%)' + matrix3d
  }

  renderObject(
    object: CSS3DObject | Scene | AbstractMesh,
    scene: Scene,
    camera: Camera,
    cameraCSSMatrix,
  ) {
    console.log('renderObject')

    if (object instanceof CSS3DObject) {
      var style: string
      var objectMatrixWorld = object.getWorldMatrix().clone()
      var camMatrix = camera.getWorldMatrix()
      var innerMatrix = objectMatrixWorld.m

      // Set scaling
      const youtubeVideoWidth = 4.8
      const youtubeVideoHeight = 3.6

      innerMatrix[0] *= 0.01 / youtubeVideoWidth
      innerMatrix[2] *= 0.01 / youtubeVideoWidth
      innerMatrix[5] *= 0.01 / youtubeVideoHeight

      // Set position from camera
      innerMatrix[12] = -camMatrix.m[12] + object.position.x
      innerMatrix[13] = -camMatrix.m[13] + object.position.y
      innerMatrix[14] = camMatrix.m[14] - object.position.z
      innerMatrix[15] = camMatrix.m[15] * 0.00001

      objectMatrixWorld = Matrix.FromArray(innerMatrix)
      if (this.isIE) {
        // IE will round numbers like 1e-005 to zero so we need to scale whole matrix up.
        // Side-effect is reduced accuracy with CSS object mapping to babylonjs object
        objectMatrixWorld = objectMatrixWorld.scale(100)
      }
      style = this.getObjectCSSMatrix(objectMatrixWorld, cameraCSSMatrix)
      var element = object.element
      var cachedObject = this.cache.objects.get(object)

      if (cachedObject === undefined || cachedObject.style !== style) {
        element.style.webkitTransform = style
        element.style.transform = style

        var objectData = { style: style }

        this.cache.objects.set(object, objectData)
      }
      if (element.parentNode !== this.cameraElement) {
        this.cameraElement.appendChild(element)
      }
    } else if (object instanceof Scene) {
      for (var i = 0, l = object.meshes.length; i < l; i++) {
        this.renderObject(object.meshes[i], scene, camera, cameraCSSMatrix)
      }
    }
  }

  render(scene: Scene, camera: Camera) {
    console.log('render')

    var projectionMatrix = camera.getProjectionMatrix()
    var fov = projectionMatrix.m[5] * this.heightHalf

    if (this.cache.camera.fov !== fov) {
      if (camera.mode == Camera.PERSPECTIVE_CAMERA) {
        this.domElement.style.webkitPerspective = fov + 'px'
        this.domElement.style.perspective = fov + 'px'
      } else {
        this.domElement.style.webkitPerspective = ''
        this.domElement.style.perspective = ''
      }
      this.cache.camera.fov = fov
    }

    if (camera.parent === null) camera.computeWorldMatrix()

    var matrixWorld = camera.getWorldMatrix().clone()
    var rotation = matrixWorld.clone().getRotationMatrix().transpose()
    var innerMatrix = matrixWorld.m

    innerMatrix[1] = rotation.m[1]
    innerMatrix[2] = -rotation.m[2]
    innerMatrix[4] = -rotation.m[4]
    innerMatrix[6] = -rotation.m[6]
    innerMatrix[8] = -rotation.m[8]
    innerMatrix[9] = -rotation.m[9]

    matrixWorld = Matrix.FromArray(innerMatrix)

    var cameraCSSMatrix = 'translateZ(' + fov + 'px)' + this.getCameraCSSMatrix(matrixWorld)

    var style = cameraCSSMatrix + 'translate(' + this.widthHalf + 'px,' + this.heightHalf + 'px)'

    if (this.cache.camera.style !== style && !this.isIE) {
      this.cameraElement.style.webkitTransform = style
      this.cameraElement.style.transform = style
      this.cache.camera.style = style
    }

    this.renderObject(scene, scene, camera, cameraCSSMatrix)
  }
}
