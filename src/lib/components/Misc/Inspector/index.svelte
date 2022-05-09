<script lang="ts">
  import type { Scene } from '@babylonjs/core'
  import '@babylonjs/core/Debug/debugLayer'
  import '@babylonjs/core/Meshes/instancedMesh.js'
  import { getContext, onMount } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'

  const scene = getContext<Writable<Scene>>('scene')

  let initialized = false
  onMount(async () => {
    await import('@babylonjs/inspector')
    initialized = true
  })

  export let inactive = false

  $: if (!inactive && $scene && initialized) {
    $scene.debugLayer.show({
      embedMode: true,
    })
  }
</script>
