import type * as BABYLON from 'babylonjs'
import { getContext } from 'svelte'

export default function getParent(): {
  self: BABYLON.Mesh
  materials: Record<string, BABYLON.Material>
} {
  return getContext('parent')
}
