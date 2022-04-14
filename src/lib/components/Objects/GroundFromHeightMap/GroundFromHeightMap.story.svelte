<script lang="ts" context="module">
  import { Vector3 } from '@babylonjs/core'
  import type { PageMeta } from '@vitebook/client'
  import {
    ArcRotateCamera,
    Canvas,
    DirectionalLight,
    GroundFromHeightMap,
    HemisphericLight,
  } from 'svelte-babylon'

  export const __pageMeta: PageMeta = {
    title: 'GroundFromHeightMap',
    description: 'https://doc.babylonjs.com/divingDeeper/mesh/creation/set/ground_hmap',
  }
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
>
  <HemisphericLight intensity={0.5} />
  <DirectionalLight
    intensity={0.25}
    direction={new Vector3(-10, -20, -10)}
    position={new Vector3(2, 6, 2)}
  />
  <ArcRotateCamera radius={5} />
  <GroundFromHeightMap
    url="/assets/images/heightMap.png"
    options={{ width: 5, height: 5, subdivisions: 500, maxHeight: 1 }}
  />
</Canvas>
