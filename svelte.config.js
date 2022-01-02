import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    sourceMap: true,
  }),

  kit: {
    adapter: adapter(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      optimizeDeps: {
        include: ['babylonjs-loaders'],
      },
      resolve: {
        alias: {
          'svelte-babylon': path.resolve('src/lib'),
        },
      },
    },
    package: {
      files: id => !id.startsWith('site/') && !id.includes('Doc'),
    },
  },
}

export default config
