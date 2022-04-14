import type { StandardMaterial } from '@babylonjs/core'
import { getContext } from 'svelte'

export default function getParent(): {
  self: StandardMaterial
} {
  return getContext('material')
}
