<script lang="ts">
  import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
  import type { PhysicsImpostorParameters } from '@babylonjs/core/Physics/physicsImpostor.js'
  import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor.js'
  import type { Scene } from '@babylonjs/core/scene.js'
  import { getContext, onDestroy, onMount } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'

  const scene = getContext<Writable<Scene>>('scene')
  const parent = getContext<Writable<Mesh>>('object')

  if (!$parent) {
    throw new Error(
      'Could not find parent context. The <PhysicsImpostor> has to be nested inside of another Object, eg. <Box>',
    )
  }

  /**
   * eg PhysicsImpostor.BoxImpostor
   * There is no proper type handling in babylonjs, might open a pull request
   */
  export let type = PhysicsImpostor.BoxImpostor
  /**
   * - mass: The only mandatory parameters is mass, which is the object's mass in kg. A 0 as a value will create a static impostor - good for floors.
   * - friction: is the impostor's friction when colliding against other impostors.
   * - restitution: is the amount of force the body will "give back" when colliding. A low value will create no bounce, a value of 1 will be a very bouncy interaction.
   * - nativeOptions: is a JSON with native options of the selected physics plugin. More about it in the advanced tutorial.
   * - ignoreParent: when using babylon's parenting system, the physics engine will use the compound system. To avoid using the compound system, set this flag to true. More about it in the advanced tutorial.
   * - disableBidirectionalTransformation: will disable the bidirectional transformation update. Setting this will make sure the physics engine ignores changes made to the mesh's position and rotation (and will increase performance a bit)
   * - group: set the collision group (ammojs only)
   * - collision bit mask. Only impostor's group that have at least one bit in the mask will have collisions (ammojs)
   * @link https://doc.babylonjs.com/divingDeeper/physics/usingPhysicsEngine#impostors
   */
  export let options: PhysicsImpostorParameters = {} as PhysicsImpostorParameters

  // create the physics impostor
  export let impostor = new PhysicsImpostor(
    $parent,
    type,
    /**
     * we overwrite some options here, setting them directly results in a jumping of some objects
     */
    { ...options, mass: 0, restitution: 0 },
    $scene,
  )

  onMount(async () => {
    await import('@babylonjs/core/Physics')
  })

  onDestroy(() => {
    impostor?.dispose()
  })

  /**
   * if we don't do it like this and directly
   * set the options onMount, the object might jump weirdly
   */
  $: if (impostor) {
    if (impostor.mass !== options.mass) {
      impostor.setMass(options.mass)
    }
    if (impostor.restitution !== options.restitution) {
      impostor.restitution = options.restitution
    }
  }
</script>
