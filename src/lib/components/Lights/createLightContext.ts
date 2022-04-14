import type { Light } from '@babylonjs/core'
import { setContext } from 'svelte'

export function createLightContext(self: Light): Light {
  setContext('light', self)

  return self
}
