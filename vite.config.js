import { sveltepress } from '@sveltepress/vite'
import path from 'path'
import { defaultTheme } from '@sveltepress/theme-default'
import navbar from './config/navbar'
import sidebar from './config/sidebar'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltepress({
			theme: defaultTheme({
				navbar,
				sidebar,
				logo: '/svelte-babylon-logo.png',
				github: 'https://github.com/Myrmod/svelte-babylon',
				twitter: 'https://twitter.com/myrmod',
			}),
			siteConfig: {
				title: 'Svelte-Babylon',
				description:
					'The documentation of the npm library "svelte-babylon", which can be used to create web-based 3D applications.',
			},
		}),
	],
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
