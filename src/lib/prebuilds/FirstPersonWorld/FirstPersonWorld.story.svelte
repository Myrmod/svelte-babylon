<script lang="ts">
  import Custom from '$lib/components/Objects/Custom/index.svelte'
  import Screen from '$lib/prebuilds/Screen/index.svelte'
  import type RootContext from '$lib/types'
  import type { ISceneLoaderAsyncResult } from '@babylonjs/core/Loading/sceneLoader'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor'
  import FirstPersonWorld from './index.svelte'

  let root: RootContext
  let meshes: ISceneLoaderAsyncResult['meshes']

  $: if (meshes) {
    meshes.forEach(mesh => {
      mesh.getChildMeshes().forEach(child => {
        child.physicsImpostor = new PhysicsImpostor(
          child,
          PhysicsImpostor.BoxImpostor,
          { mass: 0 },
          root.scene,
        )
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
