import type RootContext from '$lib/types'
import { getContext, setContext } from 'svelte'

const ROOT = {}

export function getRoot(): RootContext {
  return getContext(ROOT)
}

export function setRoot(context: RootContext): RootContext {
  setContext(ROOT, context)

  return context
}
