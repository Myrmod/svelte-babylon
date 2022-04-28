import type RootContext from '$lib/types'
import { getContext } from 'svelte'
import type { Writable } from 'svelte/store'

export function getRoot(): Writable<RootContext> {
  return getContext('root')
}
