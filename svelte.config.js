import adapter from '@sveltejs/adapter-auto'
import path from 'path'
import preprocess from 'svelte-preprocess'

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
        include: ['babylonjs-loaders/babylonjs.loaders.min'],
      },
      resolve: {
        alias: {
          'svelte-babylon': path.resolve('src/lib'),
          vitebook: path.resolve('.vitebook'),
        },
      },
    },
    package: {
      files: id => !id.startsWith('site/') && !id.includes('.story.svelte'),
    },
  },
}

export default config
