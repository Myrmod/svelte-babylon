<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  import { createObjectContext } from './createObjectContext'

  const root = getRoot()

  export let meshesNames: Array<string> | string = ''
  export let fileName: string | File
  export let name: string = String(fileName)
  export let pluginExtension: string = undefined
  export let rootUrl: string = '/'
  export let onProgress: (event: BABYLON.ISceneLoaderProgressEvent) => void = undefined
  export let receiveShadows = false

  export let context: {
    self: BABYLON.AbstractMesh
  } = createObjectContext(undefined as BABYLON.Mesh)
  export let position = new BABYLON.Vector3(0, 0, 0)
  export let rotation = new BABYLON.Vector3(0, 0, 0)
  export let rotationQuaternion: BABYLON.Quaternion = null

  onMount(async () => {
    try {
      context.self = (
        await BABYLON.SceneLoader.ImportMeshAsync(
          meshesNames,
          rootUrl,
          fileName,
          root.scene,
          onProgress,
          pluginExtension,
        )
      ).meshes.find(mesh => mesh.name === name)
      root.objects[context.self.id] = context

      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    delete root.objects[context.self.id]
  })

  $: if (root.objects[context?.self?.id]) {
    context.self.position.x = position.x
    context.self.position.y = position.y
    context.self.position.z = position.z
    context.self.receiveShadows = receiveShadows
    context.self.rotationQuaternion = rotationQuaternion
    context.self.rotation.x = rotation.x
    context.self.rotation.y = rotation.y
    context.self.rotation.z = rotation.z

    root.scene.render()
  }
</script>

<slot />
