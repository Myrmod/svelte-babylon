<!-- @component
allows you to create a debug layer on top of your scene
 -->
<script lang="ts">
  import { Scene, type IInspectorOptions } from '@babylonjs/core'
  import '@babylonjs/core/Debug/debugLayer.js'
  import '@babylonjs/core/Meshes/instancedMesh.js'
  import { getContext, onMount } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'

  const scene = getContext<Writable<Scene>>('scene')
  if (!($scene instanceof Scene)) {
    throw new Error('Inspector requires a parent of Scene')
  }

  export let options: IInspectorOptions = {
    embedMode: true,
  }

  let initialized = false
  onMount(async () => {
    await import('@babylonjs/inspector')
    initialized = true
  })

  export let inactive = false

  $: if (!inactive && $scene && initialized) {
    $scene.debugLayer.show(options)
  }
</script>
