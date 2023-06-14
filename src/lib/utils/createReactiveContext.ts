import { setContext } from 'svelte'
import { writable, type Writable } from 'svelte/store'

export function createReactiveContext<T>(name: string, self: T): Writable<T> {
	const store = writable(self)
	setContext(name, store)

	return store
}
