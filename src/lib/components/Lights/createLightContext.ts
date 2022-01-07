import type * as BABYLON from 'babylonjs'
import { setContext } from 'svelte'

export function createLightContext(self: BABYLON.Light): BABYLON.Light {
  setContext('light', self)

  return self
}
