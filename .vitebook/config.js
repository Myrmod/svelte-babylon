import { svelte } from '@sveltejs/vite-plugin-svelte'
import { clientPlugin, defineConfig } from '@vitebook/client/node'
import { shikiMarkdownPlugin } from '@vitebook/markdown-shiki/node'
import { svelteMarkdownPlugin } from '@vitebook/markdown-svelte/node'
import { defaultThemePlugin } from '@vitebook/theme-default/node'
import preprocess from 'svelte-preprocess'

export default defineConfig({
  include: ['src/**/*.md', 'src/**/*.story.svelte'],
  alias: {
    $app: '/node_modules/@sveltejs/kit/assets/app',
    $lib: '/src/lib',
  },
  plugins: [
    svelteMarkdownPlugin(),
    shikiMarkdownPlugin(),
    clientPlugin({ appFile: 'App.svelte' }),
    defaultThemePlugin(),
    svelte({
      compilerOptions: {
        hydratable: true,
      },
      extensions: ['.svelte', '.md'],
      // Consult https://github.com/sveltejs/svelte-preprocess for more information
      // about preprocessors.
      preprocess: preprocess(),
    }),
  ],
  vite: {
    optimizeDeps: {
      include: ['babylonjs-loaders/babylonjs.loaders'],
    },
  },
  site: {
    title: 'Svelte Babylon',
    description: 'A wrapper around BabylonJS written in Svelte',
    /** @type {(import('@vitebook/theme-default/node').DefaultThemeConfig} */
    theme: {
      darkMode: {
        enabled: true,
        buttonAriaLabel: 'Toggle dark mode',
      },
      remoteGitRepo: {
        url: 'https://github.com/Myrmod/svelte-babylon',
      },
      socials: {
        twitter: 'https://twitter.com/myrmod',
      },
      homePage: {
        heroText: 'Svelte Babylon',
        primaryActionText: 'Get Started',
        primaryActionLink: '/getting-started.html',
        // secondaryActionText: 'Documentation',
        // secondaryActionLink: '/examples/rotatecameratoclickedface.html',
        // features: [
        //   {
        //     title: 'Instant Server Start',
        //     body: 'On demand file serving over native ESM, no bundling required!',
        //   },
        // ],
      },
      sidebar: {
        toggleAriaLabel: 'Toggle sidebar menu',
        style: 'docs',
      },
    },
  },
})
