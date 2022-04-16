import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
import type { LinesMesh } from '@babylonjs/core/Meshes/linesMesh'
import type { Mesh } from '@babylonjs/core/Meshes/mesh'
import { setContext } from 'svelte'

export function createObjectContext(self: Mesh | AbstractMesh | LinesMesh): {
  self: Mesh | AbstractMesh | LinesMesh
} {
  const context = {
    self,
  }
  setContext('object', context)
  return context
}
