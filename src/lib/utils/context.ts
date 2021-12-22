import { getContext, setContext } from 'svelte'
import type RootContext from '$lib/types'

const ROOT = {}

export function getRoot(): RootContext {
  return getContext(ROOT)
}

export function set_root(context: RootContext) {
  setContext(ROOT, context)
  return context
}
