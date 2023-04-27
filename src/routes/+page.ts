import { redirect } from '@sveltejs/kit'

export const prerender = true

/** @type {import('./$types').PageLoad} */
export function load(): void {
	throw redirect(301, '/docs')
}
