<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  import { createLightContext } from '../createLightContext'

  const root = getRoot()

  export let name: string = 'HemisphericLight'
  export let diffuse: BABYLON.Color3 = BABYLON.Color3.White()
  export let direction = BABYLON.Vector3.Zero()
  export let groundColor = BABYLON.Color3.Black() // TODO: somehow it's not working https://doc.babylonjs.com/typedoc/classes/babylon.hemisphericlight#groundcolor
  // export let excludeWithLayerMask = undefined
  // export let falloffType: BABYLON.Light = undefined
  export let intensity = 1
  // export let intensityMode = undefined
  // export let radius = undefined
  // export let range = 100
  export let shadowEnabled = true
  export let specular: BABYLON.Color3 = BABYLON.Color3.White()
  export const light = createLightContext(new BABYLON.HemisphericLight(name, direction, root.scene))

  onMount(() => {
    try {
      root.lights[light.id] = light

      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    root.lights[light.id] = null
  })

  $: if (root.lights[light.id]) {
    light.diffuse = diffuse
    light.specular = specular
    light.groundColor = groundColor

    // light.excludeWithLayerMask = excludeWithLayerMask
    // light.falloffType = falloffType
    light.intensity = intensity
    // light.intensityMode = intensityMode
    // light.radius = radius
    // light.range = range
    light.shadowEnabled = shadowEnabled

    root.scene.render()
  }
</script>

<slot />
