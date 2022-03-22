<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  import { createMaterialContext } from '../createMaterialContext'
  import getParent from '../getParent'
  // import CSS3DObject from './CSS3DObject'
  // import CSS3DRenderer from './CSS3DRenderer'

  const root = getRoot()
  const parent = getParent()
  // const renderer = new CSS3DRenderer()
  // createCSSobject()

  let container = document.createElement('div')
  container.id = 'css-container'
  container.style.position = 'absolute'
  container.style.width = '100%'
  container.style.height = '100%'
  container.style.zIndex = '-1'
  // renderer.setSize(root.canvas.width, root.canvas.height)

  export let name: string = 'HTMLMaterial'

  export const material = new BABYLON.StandardMaterial(name, root.scene)
  material.backFaceCulling = false

  createMaterialContext(material)

  let onBeforeRenderObservable: BABYLON.Observer<BABYLON.Mesh> = undefined
  let onAfterRenderObservable: BABYLON.Observer<BABYLON.Mesh> = undefined
  let oldClearColor: BABYLON.Color4
  onMount(() => {
    try {
      if (parent.self.material) {
        console.warn(`Previous material on ${parent.self.id} will be overwritten`)
      }

      parent.self.material = material

      // we need those events, otherwise no texture will be rendered
      onBeforeRenderObservable = parent.self.onBeforeRenderObservable.add(() =>
        root.scene.getEngine().setColorWrite(false),
      )
      onAfterRenderObservable = parent.self.onAfterRenderObservable.add(() =>
        root.scene.getEngine().setColorWrite(true),
      )

      // swap meshes to put mask first
      root.scene.meshes[root.scene.meshes.indexOf(parent.self)] = root.scene.meshes[0]
      root.scene.meshes[0] = parent.self

      // The canvas' clearcolor has to be transparent, otherwise we dont see anything
      if (root.scene.clearColor !== new BABYLON.Color4(0, 0, 0, 0)) {
        oldClearColor = root.scene.clearColor
        root.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0)
      }

      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    parent.self.material = null
    parent.self.onBeforeRenderObservable.remove(onBeforeRenderObservable)
    parent.self.onAfterRenderObservable.remove(onAfterRenderObservable)
    root.scene.clearColor = oldClearColor
    material.dispose()
  })

  function createCSSobject() {
    const width = 480
    const height = 360
    root.scene.onBeforeRenderObservable.add(() => {
      renderer.render(root.scene, root.scene.activeCamera)
    })
    const div = document.createElement('div')
    div.style.width = width + 'px'
    div.style.height = height + 'px'
    div.style.backgroundColor = 'yellow'
    const CSSobject = new CSS3DObject(div, root.scene)
    CSSobject.position.copyFrom(parent.self.getAbsolutePosition())
    CSSobject.rotation.y = -parent.self.rotation.y
    CSSobject.scaling.copyFrom(parent.self.scaling)

    const iframe = document.createElement('iframe')
    iframe.id = 'video-qgKbpe4qvno'
    iframe.style.width = width + 'px'
    iframe.style.height = height + 'px'
    iframe.style.border = '0px'
    iframe.allow = 'autoplay'
    iframe.src = [
      'https://www.youtube.com/embed/',
      'qgKbpe4qvno',
      '?rel=0&enablejsapi=1&disablekb=1&autoplay=1&controls=0&fs=0&modestbranding=1',
    ].join('')
    div.appendChild(iframe)

    return CSSobject
  }
</script>
