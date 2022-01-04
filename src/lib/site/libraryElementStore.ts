import { writable } from 'svelte/store'

const defaultValue: Array<string> = []

export default writable(defaultValue)
