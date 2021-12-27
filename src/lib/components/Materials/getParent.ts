import type * as BABYLON from 'babylonjs'
import { getContext } from 'svelte'

export default function getParent(): {
  self: BABYLON.Mesh
} {
  return getContext('object')
}
