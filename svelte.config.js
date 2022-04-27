/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import adapter from '@sveltejs/adapter-static'
import { kitDocsPlugin } from '@svelteness/kit-docs/node'
import path from 'path'
import preprocess from 'svelte-preprocess'
import Icons from 'unplugin-icons/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    sourceMap: true,
  }),
  extensions: ['.svelte', '.md'],
  kit: {
    adapter: adapter(),

    prerender: {
      default: true,
      entries: ['*'],
    },

    vite: {
      resolve: {
        alias: {
          'svelte-babylon': path.resolve('src/lib'),
          $docs: path.resolve('src/docs'),
          $routes: path.resolve('src/routes'),
          $examples: path.resolve('src/examples'),
        },
      },
      plugins: [
        Icons({ compiler: 'svelte' }),
        kitDocsPlugin({
          shiki: {
            theme: 'material-ocean',
          },
        }),
      ],
      define: {
        'process.env.VITE_BUILD_TIME': JSON.stringify(new Date().toISOString()),
      },
    },
    package: {
      files: id => !id.includes('.story.svelte') && !id.includes('docs') && !id.includes('fonts'),
    },
  },
}

export default config
