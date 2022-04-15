import { getContext, setContext } from 'svelte'
import type RootContext from 'svelte-babylon/types'

const ROOT = {}

export function getRoot(): RootContext {
  return getContext(ROOT)
}

export function setRoot(context: RootContext): RootContext {
  setContext(ROOT, context)

  return context
}
