import type * as BABYLON from 'babylonjs'
import { setContext } from 'svelte'

export function createMaterialContext(self: BABYLON.StandardMaterial): {
  self: BABYLON.StandardMaterial
} {
  const context = {
    self,
  }
  setContext('material', context)
  return context
}
