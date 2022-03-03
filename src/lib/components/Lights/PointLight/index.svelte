<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  import { createLightContext } from '../createLightContext'

  const root = getRoot()

  export let name: string = 'PointLight'
  export let intensity = 1
  export let diffuse: BABYLON.Color3 = BABYLON.Color3.White()
  export let specular: BABYLON.Color3 = BABYLON.Color3.White()
  export let position = BABYLON.Vector3.Zero()
  export let x: number = undefined
  export let y: number = undefined
  export let z: number = undefined
  export let shadowMaxZ = undefined
  export let shadowMinZ = undefined

  // shadow
  export let castShadowOf: Array<BABYLON.Mesh | BABYLON.AbstractMesh> = undefined

  /**
   * @link https://doc.babylonjs.com/divingDeeper/lights/shadows#exponential-shadow-map
   */
  export let useExponentialShadowMap = false
  /**
   * @link https://doc.babylonjs.com/divingDeeper/lights/shadows#poisson-sampling
   */
  export let usePoissonSampling = false
  /**
   * @link https://doc.babylonjs.com/divingDeeper/lights/shadows#blur-exponential-shadow-map
   */
  export let useBlurExponentialShadowMap = false

  export const light = createLightContext(
    new BABYLON.PointLight(name, position, root.scene),
  ) as BABYLON.PointLight

  onMount(() => {
    try {
      root.lights[light.id] = light

      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    root.lights[light.id].dispose()
    delete root.lights[light.id]

    if (shadowGenerator) {
      shadowGenerator.dispose()
    }
  })

  $: if (light) {
    light.intensity = intensity
    light.diffuse = diffuse
    light.specular = specular
    light.position.x = x || position.x
    light.position.y = y || position.y
    light.position.z = z || position.z
    light.shadowMaxZ = shadowMaxZ
    light.shadowMinZ = shadowMinZ

    if (Object.keys(root.cameras).length) {
      root.scene.render()
    }
  }

  let shadowGenerator: BABYLON.ShadowGenerator
  $: if (castShadowOf?.length) {
    if (!shadowGenerator) {
      shadowGenerator = new BABYLON.ShadowGenerator(1024, light)
    }
    if (shadowGenerator) {
      castShadowOf
        .filter(i => i)
        .forEach(mesh => {
          shadowGenerator?.addShadowCaster(mesh)
        })

      shadowGenerator.useExponentialShadowMap = useExponentialShadowMap
      shadowGenerator.usePoissonSampling = usePoissonSampling
      shadowGenerator.useBlurExponentialShadowMap = useBlurExponentialShadowMap

      root.scene.render()
    }
  }
</script>

<slot />
