import type { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js'
import { getContext } from 'svelte'

export default function getParent(): {
  self: StandardMaterial
} {
  return getContext('material')
}
