import type { Mesh } from '@babylonjs/core'
import { getContext } from 'svelte'

export default function getParent(): {
  self: Mesh
} {
  return getContext('object')
}
