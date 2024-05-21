/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: vitePreprocess({
		sourceMap: true,
	}),
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter(),

		prerender: {
			entries: ['*'],
		},
	},
}

export default config
