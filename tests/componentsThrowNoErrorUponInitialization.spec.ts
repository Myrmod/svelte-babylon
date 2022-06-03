import { expect, test } from '@playwright/test'

test.describe('Components throw no error upon initialization', () => {
  ;[
    {
      name: 'Introduction',
      url: '/docs/introduction/getting-started',
    },
    {
      name: 'Canvas',
      url: '/docs/components/canvas',
    },
    {
      name: 'Cameras',
      url: '/docs/components/cameras',
    },
    {
      name: 'Gizmos',
      url: '/docs/components/gizmos',
    },
    {
      name: 'GUI/CheckboxStory',
      component: 'CheckboxStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/ColorPickerStory',
      component: 'ColorPickerStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/DisplayGridStory',
      component: 'DisplayGridStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/EllipseStory',
      component: 'EllipseStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/GridStory',
      component: 'GridStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/ImageStory',
      component: 'ImageStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/InputPasswordStory',
      component: 'InputPasswordStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/InputTextStory',
      component: 'InputTextStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/LineStory',
      component: 'LineStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/RadioButtonStory',
      component: 'RadioButtonStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/RectangleStory',
      component: 'RectangleStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/ScrollViewerStory',
      component: 'ScrollViewerStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/SliderStory',
      component: 'SliderStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/StackPanelStory',
      component: 'StackPanelStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/TextBlockStory',
      component: 'TextBlockStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/TextButtonStory',
      component: 'TextButtonStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/VirtualKeyboardStory',
      component: 'VirtualKeyboardStory',
      url: '/docs/components/gui',
    },
    {
      name: 'GUI/XMLLoaderStory',
      component: 'XMLLoaderStory',
      url: '/docs/components/gui',
    },
    {
      name: 'Lights',
      url: '/docs/components/lights',
    },
    {
      name: 'Materials',
      url: '/docs/components/materials',
    },
    {
      name: 'Object/BoxStory',
      component: 'BoxStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/CapsuleStory',
      component: 'CapsuleStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/CustomStory',
      component: 'CustomStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/CylinderStory',
      component: 'CylinderStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/DashedLinesStory',
      component: 'DashedLinesStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/DecalStory',
      component: 'DecalStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/DiscStory',
      component: 'DiscStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/GroundStory',
      component: 'GroundStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/GroundFromHeightMapStory',
      component: 'GroundFromHeightMapStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/HexSphereStory',
      component: 'HexSphereStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/IcoSphereStory',
      component: 'IcoSphereStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/LatheStory',
      component: 'LatheStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/LinesStory',
      component: 'LinesStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/LineSystemStory',
      component: 'LineSystemStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/PhotoDomeStory',
      component: 'PhotoDomeStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/PlaneStory',
      component: 'PlaneStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/PolygonStory',
      component: 'PolygonStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/PolyhedronStory',
      component: 'PolyhedronStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/RibbonStory',
      component: 'RibbonStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/SphereStory',
      component: 'SphereStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/TiledBoxStory',
      component: 'TiledBoxStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/TiledGroundStory',
      component: 'TiledGroundStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/TiledPlaneStory',
      component: 'TiledPlaneStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/TorusStory',
      component: 'TorusStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/TorusKnotStory',
      component: 'TorusKnotStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Object/TubeStory',
      component: 'TubeStory',
      url: '/docs/components/objects',
    },
    {
      name: 'Textures',
      url: '/docs/components/textures',
    },
    {
      name: 'PhysicsImpostors',
      url: '/docs/components/physicsimpostors',
    },
    {
      name: 'Layer',
      url: '/docs/components/layer',
      component: 'LayerStory',
    },
    {
      name: 'LayerFromWebCam',
      url: '/docs/components/layer',
      component: 'LayerFromWebCamStory',
    },
    {
      name: 'LayerFromBase64String',
      url: '/docs/components/layer',
      component: 'LayerFromBase64StringStory',
    },
    {
      name: 'Instance',
      url: '/docs/components/misc/instance',
    },
    {
      name: 'XRScene',
      url: '/docs/components/xr-ar-vr',
    },
    {
      name: 'Inspector',
      url: '/docs/components/misc/inspector',
    },
    // Examples
    {
      name: "Rubik's Cube",
      url: '/docs/examples/rubiks-cube',
    },
    {
      name: 'Showroom',
      url: '/docs/examples/showroom',
    },
    {
      name: 'Shuffle',
      url: '/docs/examples/shuffle',
    },
    {
      name: 'first-person-no-physics',
      url: '/docs/examples/first-person-no-physics',
    },
    {
      name: 'Room',
      url: '/docs/examples/room',
    },
    {
      name: 'Rotate camera to clicked face',
      url: '/docs/examples/rotate-camera-to-clicked-face',
    },
  ].forEach(({ name, url, component }) => {
    test(name, async ({ page }) => {
      page.on('console', message => {
        if (message.type() === 'error') {
          expect(message.text()).toBeFalsy()
        }
      })
      await page.goto(url)

      for (const example of component
        ? await page.$$(`#${component}`)
        : await page.$$('.example-wrapper')) {
        await example.click()
      }
    })
  })
})
