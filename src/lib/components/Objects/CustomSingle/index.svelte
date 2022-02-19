<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'
  import { createObjectContext } from '../createObjectContext'

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
  } = createObjectContext(undefined)
  export let position = BABYLON.Vector3.Zero()
  export let rotation = BABYLON.Vector3.Zero()
  export let x: number = undefined
  export let y: number = undefined
  export let z: number = undefined
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
    root.objects[context.self.id].self.dispose()
    delete root.objects[context.self.id]
  })

  $: if (root.objects[context?.self?.id]) {
    context.self.position.x = x || position.x
    context.self.position.y = y || position.y
    context.self.position.z = z || position.z
    context.self.receiveShadows = receiveShadows
    context.self.rotationQuaternion = rotationQuaternion
    context.self.rotation.x = rotation.x
    context.self.rotation.y = rotation.y
    context.self.rotation.z = rotation.z

    object = context
    root.scene.render()
  }
</script>

<slot />
