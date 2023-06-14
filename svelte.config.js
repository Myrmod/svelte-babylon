/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'

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
	package: {
		files: id => !id.includes('.story.svelte') && !id.includes('docs') && !id.includes('fonts'),
	},
}

export default config
