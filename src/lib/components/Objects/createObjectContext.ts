import type { AbstractMesh, Mesh } from '@babylonjs/core'
import { setContext } from 'svelte'

export function createObjectContext(self: Mesh | AbstractMesh): {
  self: Mesh | AbstractMesh
} {
  const context = {
    self,
  }
  setContext('object', context)
  return context
}
