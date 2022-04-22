import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
import { getContext } from 'svelte'

export default function getParent(): {
  self: Mesh
} {
  return getContext('object')
}
