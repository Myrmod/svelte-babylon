<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import * as BABYLON from 'babylonjs'
  import { PhysicsImpostor, PhysicsImpostorParameters } from 'babylonjs'
  import { getContext, onDestroy, onMount } from 'svelte'

  const root = getRoot()
  const parent = getContext('object') as {
    self: BABYLON.Mesh
  }

  if (!parent) {
    throw new Error(
      'Could not find parent context. The <BeanImpostor> has to be nested inside of another Object, eg. <Box>',
    )
  }

  export let name: string = `${parent.self.name}Impostor`
  /**
   * eg BABYLON.PhysicsImpostor.BoxImpostor
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
  export const object = root.physics.impostors[name]

  onMount(async () => {
    try {
      // create the physics impostor
      parent.self.physicsImpostor = new BABYLON.PhysicsImpostor(
        parent.self,
        type,
        /**
         * we overwrite some options here, setting them directly results in a jumping of some objects
         */
        { ...options, mass: 0, restitution: 0 },
        root.scene,
      )

      root.physics.impostors[name] = parent.self.physicsImpostor
      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    parent.self?.physicsImpostor?.dispose()

    delete root.physics.impostors[name]
    if (!Object.keys(root.physics.impostors)) {
      root.scene.disablePhysicsEngine()
    }
  })

  /**
   * if we don't do it like this and directly
   * set the options onMount, the object might jump weirdly
   */
  $: if (parent.self.physicsImpostor) {
    if (parent.self.physicsImpostor.mass !== options.mass) {
      parent.self.physicsImpostor.setMass(options.mass)
    }
    if (parent.self.physicsImpostor.restitution !== options.restitution) {
      parent.self.physicsImpostor.restitution = options.restitution
    }
  }
</script>