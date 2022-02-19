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
  export let scaling = new BABYLON.Vector3(1, 1, 1)

  export let position = BABYLON.Vector3.Zero()
  export let x: number = undefined
  export let y: number = undefined
  export let z: number = undefined
  export let rotation = BABYLON.Vector3.Zero()
  export let rotationQuaternion: BABYLON.Quaternion = null
  export let __root__: BABYLON.AbstractMesh = undefined
  export let imports: BABYLON.ISceneLoaderAsyncResult = undefined
  export const context = createObjectContext(__root__)

  onMount(async () => {
    try {
      if (root.imports[name]) {
        throw new Error(`"${name} has already exists."`)
      }
      imports = await BABYLON.SceneLoader.ImportMeshAsync(
        meshesNames,
        rootUrl,
        fileName,
        root.scene,
        onProgress,
        pluginExtension,
      )

      __root__ = imports.meshes.find(mesh => mesh.id === '__root__')
      root.imports[name] = imports

      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    context.self.dispose()
    delete root.imports[name]
  })

  $: if (root.imports[name]) {
    __root__.position.x = x || position.x
    __root__.position.y = y || position.y
    __root__.position.z = z || position.z
    __root__.receiveShadows = receiveShadows
    __root__.rotationQuaternion = rotationQuaternion
    __root__.rotation.x = rotation.x
    __root__.rotation.y = rotation.y
    __root__.rotation.z = rotation.z
    __root__.scaling = scaling

    object = context
    root.scene.render()
  }
</script>

<slot />
