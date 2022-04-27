<script context="module">
  export const prerender = true

  export const load = createKitDocsLoader({ sidebar: '/docs' })
</script>

<script>
  import {
    Button,
    createKitDocsLoader,
    createSidebarContext,
    KitDocs,
    KitDocsLayout,
  } from '@svelteness/kit-docs'
  import '@svelteness/kit-docs/client/polyfills/index.js'
  import '@svelteness/kit-docs/client/styles/fonts.css'
  import '@svelteness/kit-docs/client/styles/normalize.css'
  import '@svelteness/kit-docs/client/styles/theme.css'
  import '@svelteness/kit-docs/client/styles/vars.css'

  /** @type {import('@svelteness/kit-docs').MarkdownMeta} */
  export let meta

  /** @type {import('@svelteness/kit-docs').ResolvedSidebarConfig} */
  export let sidebar

  /** @type {import('@svelteness/kit-docs').NavbarConfig} */
  const navbar = {
    links: [{ title: 'Documentation', slug: '/docs', match: /\/docs/ }],
  }

  const { activeCategory } = createSidebarContext(sidebar)
</script>

<svelte:head>
  <title>{$activeCategory}: {meta.title} | KitDocs</title>
  <meta name="description" content={meta.description} />
</svelte:head>

<KitDocs {meta}>
  <KitDocsLayout {navbar} {sidebar}>
    <div class="logo" slot="navbar-left">
      <Button href="/">
        <img class="logo" src="/svelte-babylon-logo.png" alt="Svelte-Babylon Logo" />
      </Button>
    </div>
    <div slot="navbar-right-alt">
      <a
        href="https://github.com/Myrmod/svelte-babylon"
        title="open GitHub repository"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/assets/icons/github.svg" alt="GitHub Repository" />
      </a>
    </div>

    <footer slot="main-bottom">
      <a href="/privacy" sveltekit:reload>Privacy</a>
      <a href="/sitemap.xml" sveltekit:reload>Sitemap</a>
    </footer>
    <slot />
  </KitDocsLayout>
</KitDocs>

<style>
  :global(:root) {
    --kd-color-brand-rgb: 233, 127, 6;
  }

  :global(:root.dark) {
    --kd-color-brand-rgb: 213, 149, 76;
  }

  .logo :global(a) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo :global(svg) {
    height: 36px;
    overflow: hidden;
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    gap: 2rem;
  }

  .logo {
    height: 2.5rem;
    object-fit: contain;
  }
</style>
