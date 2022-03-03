import { svelte } from '@sveltejs/vite-plugin-svelte';
import { clientPlugin, defineConfig } from '@vitebook/client/node';
import { defaultThemePlugin } from '@vitebook/theme-default/node';
import preprocess from 'svelte-preprocess';

export default defineConfig({
  include: ['src/**/*.story.svelte'],
  alias: {
    $app: '/node_modules/@sveltejs/kit/assets/app',
    $lib: '/src/lib',
  },
  plugins: [
    clientPlugin({ appFile: 'App.svelte' }),
    defaultThemePlugin(),
    svelte({
      compilerOptions: {
        hydratable: true
      },
      extensions: ['.svelte'],
      // Consult https://github.com/sveltejs/svelte-preprocess for more information
      // about preprocessors.
      preprocess: preprocess(),
    }),
  ],
  site: {
    title: 'Svelte Babylon',
    description: 'A wrapper around BabylonJS written in Svelte',
    /** @type {(import('@vitebook/theme-default/node').DefaultThemeConfig} */
    theme: {},
  },
});
