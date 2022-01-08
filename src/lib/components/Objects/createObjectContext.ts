import type * as BABYLON from 'babylonjs'
import { setContext } from 'svelte'

export function createObjectContext(self: BABYLON.Mesh | BABYLON.AbstractMesh): {
  self: BABYLON.Mesh | BABYLON.AbstractMesh
} {
  const context = {
    self,
  }
  setContext('object', context)
  return context
}
