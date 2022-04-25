import type RootContext from '$lib/types'
import { getContext, setContext } from 'svelte'
import { writable, type Writable } from 'svelte/store'

const ROOT = {} as RootContext
const rootStore = writable<RootContext>(ROOT)

export function getRoot(): Writable<RootContext> {
  return getContext(rootStore)
}

export function setRoot(context: RootContext): Writable<RootContext> {
  rootStore.set(context)
  setContext(rootStore, rootStore)

  return rootStore
}
