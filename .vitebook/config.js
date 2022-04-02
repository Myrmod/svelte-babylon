import { svelte } from '@sveltejs/vite-plugin-svelte'
import { clientPlugin, defineConfig } from '@vitebook/client/node'
import { shikiMarkdownPlugin } from '@vitebook/markdown-shiki/node'
import { svelteMarkdownPlugin } from '@vitebook/markdown-svelte/node'
import { defaultThemePlugin } from '@vitebook/theme-default/node'
import path from 'path'
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
    resolve: {
      alias: {
        'svelte-babylon': path.resolve('src/lib'),
        vitebook: path.resolve('.vitebook'),
      },
    },
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
        features: [
          {
            title: 'Easy to learn syntax',
            body: 'We have the great developer experience of Svelte with its awesome community. To make abstractions which help us to lower the bar of entry.',
          },
          {
            title: 'Great power',
            body: 'We integrate BabylonJS in sucha way, that we can do everything BabylonJS can do, just with an easier to use syntax.',
          },
          {
            title: 'Accessibility',
            body: "A11y is not just an afterthought. Though it's still work in progress, it is planned to provide features for the usage of screenreaders and tab behaviour.",
          },
          {
            title: 'WebXR',
            body: "The aim is to provide an easy way to build applications, that are usable within VR/AR. This is still work in progress though, we don't restrict BabylonJS' native features in that regard.",
          },
        ],
      },
      sidebar: {
        toggleAriaLabel: 'Toggle sidebar menu',
        style: 'docs',
      },
    },
  },
})
