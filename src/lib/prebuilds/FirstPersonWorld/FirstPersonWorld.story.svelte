<script lang="ts">
  import Custom from '$lib/components/Objects/Custom/index.svelte'
  import Screen from '$lib/prebuilds/Screen/index.svelte'
  import type RootContext from '$lib/types'
  import type { ISceneLoaderAsyncResult } from '@babylonjs/core/Loading/sceneLoader.js'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor.js'
  import FirstPersonWorld from './index.svelte'

  let root: RootContext
  let meshes: ISceneLoaderAsyncResult['meshes']

  $: if (root?.scene?.physicsEnabled && meshes) enablePhysics()
  async function enablePhysics() {
    meshes.forEach(async mesh => {
      await new Promise<void>(resolve => {
        mesh.getChildMeshes().forEach((child, index, array) => {
          child.physicsImpostor = new PhysicsImpostor(
            child,
            PhysicsImpostor.BoxImpostor,
            { mass: 0 },
            root.scene,
          )

          if (index === array.length - 1) {
            resolve()
          }
        })
      })

      mesh.physicsImpostor = new PhysicsImpostor(
        mesh,
        PhysicsImpostor.BoxImpostor,
        { mass: 0 },
        root.scene,
      )
    })
  }
</script>

<FirstPersonWorld bind:root playerPosition={new Vector3(0, 10, 0)}>
  <Custom
    name="Level"
    rootUrl="/assets/models/"
    fileName="Prototype_Level.glb"
    bind:meshes
    receiveShadows
    checkCollisions
    slot="models"
  />
  <Screen />
</FirstPersonWorld>
