import type { Layer } from '@babylonjs/core/Layers/layer.js'
import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
import type { LinesMesh } from '@babylonjs/core/Meshes/linesMesh'
import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
import { setContext } from 'svelte'

type Self = Mesh | AbstractMesh | LinesMesh | Layer

export function createObjectContext(self: Self): {
  self: Self
} {
  const context = {
    self,
  }
  setContext('object', context)
  return context
}
