import { sveltekit } from '@sveltejs/kit/vite'
import { kitDocsPlugin } from '@svelteness/kit-docs/node'
import path from 'path'
import Icons from 'unplugin-icons/vite'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		Icons({ compiler: 'svelte' }),
		kitDocsPlugin({
			shiki: {
				theme: 'material-ocean',
			},
		}),
		sveltekit(),
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "sass:color";@import "schwabeo-ui/styles/mixins.scss";`,
			},
		},
	},
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			'svelte-babylon': path.resolve('src/lib'),
			$docs: path.resolve('src/docs'),
			$routes: path.resolve('src/routes'),
			$examples: path.resolve('src/examples'),
		},
	},
	define: {
		'process.env.VITE_BUILD_TIME': JSON.stringify(new Date().toISOString()),
	},
}

export default config
