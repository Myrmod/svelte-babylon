<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import * as BABYLON from 'babylonjs'
  import { onDestroy, onMount } from 'svelte'

  const root = getRoot()

  export let meshesNames: Array<string> | string = ''
  export let fileName: string | File
  export let name: string = String(fileName)
  export let pluginExtension: string = undefined
  export let rootUrl: string = '/'
  export let onProgress: (event: BABYLON.ISceneLoaderProgressEvent) => void = undefined
  export let receiveShadows = false

  export let position = new BABYLON.Vector3(0, 0, 0)
  export let rotation = new BABYLON.Vector3(0, 0, 0)
  export let rotationQuaternion: BABYLON.Quaternion = null
  let __root__: BABYLON.AbstractMesh = undefined

  onMount(async () => {
    try {
      if (root.imports[name]) {
        throw new Error(`"${name} has already exists."`)
      }
      const result = await BABYLON.SceneLoader.ImportMeshAsync(
        meshesNames,
        rootUrl,
        fileName,
        root.scene,
        onProgress,
        pluginExtension,
      )

      __root__ = result.meshes.find(mesh => mesh.id === '__root__')
      root.imports[name] = result

      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    delete root.imports[name]
  })

  $: if (root.imports[name]) {
    __root__.position.x = position.x
    __root__.position.y = position.y
    __root__.position.z = position.z
    __root__.receiveShadows = receiveShadows
    __root__.rotationQuaternion = rotationQuaternion
    __root__.rotation.x = rotation.x
    __root__.rotation.y = rotation.y
    __root__.rotation.z = rotation.z

    root.scene.render()
  }
</script>

<slot />
