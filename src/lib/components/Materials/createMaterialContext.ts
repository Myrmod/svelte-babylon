import type { StandardMaterial } from '@babylonjs/core'
import { setContext } from 'svelte'

export function createMaterialContext(self: StandardMaterial): {
  self: StandardMaterial
} {
  const context = {
    self,
  }
  setContext('material', context)
  return context
}
