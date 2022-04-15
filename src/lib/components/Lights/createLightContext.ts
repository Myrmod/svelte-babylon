import type { Light } from '@babylonjs/core/Lights/light'
import { setContext } from 'svelte'

export function createLightContext(self: Light): Light {
  setContext('light', self)

  return self
}
