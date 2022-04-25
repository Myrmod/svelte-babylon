<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight.js'
  import { Color3 } from '@babylonjs/core/Maths/math.color'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import { onDestroy, onMount } from 'svelte'
  import { createLightContext } from '../createLightContext'

  const root = getRoot()

  export let name: string = 'HemisphericLight'
  export let diffuse: Color3 = Color3.White()
  export let specular: Color3 = Color3.White()
  export let direction = Vector3.Zero()
  export let groundColor = Color3.Black()
  // export let excludeWithLayerMask = undefined
  // export let falloffType: Light = undefined
  export let intensity = 1
  // export let intensityMode = undefined
  // export let radius = undefined
  // export let range = 100
  export let shadowEnabled = false
  export const light = createLightContext(
    new HemisphericLight(name, direction, $root.scene),
  ) as HemisphericLight

  onMount(() => {
    try {
      $root.lights[light.id] = light

      $root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    delete $root.lights[light.id]
  })

  $: if ($root.lights[light.id]) {
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

    $root.scene.render()
  }
</script>

<slot />
