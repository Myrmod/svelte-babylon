import type { AbstractMesh, LinesMesh, Mesh } from '@babylonjs/core'
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
