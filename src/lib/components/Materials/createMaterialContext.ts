import type { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js'
import type { GradientMaterial } from '@babylonjs/materials/gradient/gradientMaterial'
import { setContext } from 'svelte'

export function createMaterialContext(self: StandardMaterial | GradientMaterial): {
  self: StandardMaterial | GradientMaterial
} {
  const context = {
    self,
  }
  setContext('material', context)
  return context
}
