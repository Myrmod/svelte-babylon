import adapter from '@sveltejs/adapter-auto'
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
    },
    package: {
      files: id => !id.includes('.story.svelte') && !id.includes('docs'),
    },
  },
}

export default config
