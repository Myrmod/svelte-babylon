<script lang="ts">
  import { getRoot } from '$lib/utils/context'

  import * as BABYLON from 'babylonjs'
  import { getContext, onDestroy } from 'svelte'

  const root = getRoot()
  const parent = getContext('light') as
    | BABYLON.PointLight
    | BABYLON.SpotLight
    | BABYLON.DirectionalLight

  export let meshes: Array<BABYLON.Mesh | BABYLON.AbstractMesh> = []
  export let mapsize = 1024
  export let usefullFloatFirst: boolean = undefined
  export const shadowGenerator = new BABYLON.ShadowGenerator(mapsize, parent, usefullFloatFirst)

  onDestroy(() => {
    shadowGenerator.dispose()
  })

  $: if (shadowGenerator) {
    shadowGenerator.mapSize = mapsize

    root.scene.render()
  }

  $: if (meshes.length) {
    meshes.forEach(mesh => {
      shadowGenerator.addShadowCaster(mesh)
    })

    root.scene.render()
  }
</script>
