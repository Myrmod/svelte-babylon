<script lang="ts">
  import { createReactiveContext } from '$lib/utils/createReactiveContext'
  import type { Node } from '@babylonjs/core'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import { TransformNode } from '@babylonjs/core/Meshes/transformNode.js'
  import type { Scene } from '@babylonjs/core/scene.js'
  import { getContext, onDestroy } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'

  const scene = getContext<Writable<Scene>>('scene')

  export let name: string = 'TransformNode'

  export let parent = getContext<Writable<Node>>('object')
  export let isPure: boolean = undefined

  export let object = createReactiveContext('object', new TransformNode(name, $scene, isPure))
  export let position = Vector3.Zero()
  export let x: number = undefined
  export let y: number = undefined
  export let z: number = undefined
  export let rotation = Vector3.Zero()

  onDestroy(() => {
    $object.dispose()
  })

  $: if ($object) {
    $object.position.x = x || position.x
    $object.position.y = y || position.y
    $object.position.z = z || position.z
    $object.rotation = rotation
  }

  $: if ($parent) {
    $object.parent = $parent
  }
</script>

<slot />
