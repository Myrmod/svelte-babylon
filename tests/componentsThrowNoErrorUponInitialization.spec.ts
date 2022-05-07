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
      name: 'GUI',
      url: '/docs/components/GUI',
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
    // this test currently doesn'T work since we don't have the WebXR API in place.
    // {
    //   name: 'XRScene',
    //   url: '/docs/components/xr-ar-v',
    // },
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
