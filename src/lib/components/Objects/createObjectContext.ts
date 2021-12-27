import type * as BABYLON from 'babylonjs'
import { setContext } from 'svelte'

export function createObjectContext(self: BABYLON.Mesh): {
  self: BABYLON.Mesh
} {
  const context = {
    self,
  }
  setContext('object', context)
  return context
}
