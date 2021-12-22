import type * as BABYLON from 'babylonjs'
import { setContext } from 'svelte'

export function createObjectcontext(self: BABYLON.Mesh): {
  self: BABYLON.Mesh
} {
  const context = {
    self,
    materials: {},
  }
  setContext('parent', context)
  return context
}
