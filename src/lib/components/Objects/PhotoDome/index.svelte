<script lang="ts">
  import { PhotoDome } from '@babylonjs/core/Helpers/photoDome.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'

  const dispatch = createEventDispatcher()

  const scene = getContext<Writable<Scene>>('scene')

  export let name: string = 'PhotoDome'
  export let options = {} as {
    resolution?: number
    clickToPlay?: boolean
    autoPlay?: boolean
    loop?: boolean
    size?: number
    poster?: string
    faceForward?: boolean
    useDirectMapping?: boolean
    halfDomeMode?: boolean
    crossEyeMode?: boolean
    generateMipMaps?: boolean
    mesh?: Mesh
  }

  export let position = Vector3.Zero()
  export let x: number = undefined
  export let y: number = undefined
  export let z: number = undefined
  export let rotation = Vector3.Zero()
  export let url: string | string[] | HTMLVideoElement

  export let object = new PhotoDome(name, url, options, $scene, (message, exception) => {
    dispatch('error', { message, exception })
  })

  onMount(() => {
    try {
      $scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    object.dispose()
  })

  $: if (object) {
    object.rotation = rotation
    object.position.x = x || position.x
    object.position.y = y || position.y
    object.position.z = z || position.z

    object = object
    $scene.render()
  }
</script>

<slot />
