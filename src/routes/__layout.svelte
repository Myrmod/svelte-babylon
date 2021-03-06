<script context="module">
  export const prerender = true
  import {
    Button,
    createKitDocsLoader,
    createSidebarContext,
    KitDocs,
    KitDocsLayout,
    SocialLink,
  } from '@svelteness/kit-docs'
  import '@svelteness/kit-docs/client/polyfills/index.js'
  import '@svelteness/kit-docs/client/styles/fonts.css'
  import '@svelteness/kit-docs/client/styles/normalize.css'
  import '@svelteness/kit-docs/client/styles/theme.css'
  import '@svelteness/kit-docs/client/styles/vars.css'

  export const load = createKitDocsLoader({ sidebar: '/docs' })
</script>

<script>
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
  <title>{$activeCategory}: {meta?.title || 'Svelte-Babylon'}</title>
  <meta name="description" content={meta?.description} />
</svelte:head>

<KitDocs {meta}>
  <KitDocsLayout {navbar} {sidebar}>
    <div class="logo" slot="navbar-left">
      <Button href="/">
        <img class="logo" src="/svelte-babylon-logo.png" alt="Svelte-Babylon Logo" />
      </Button>
    </div>
    <div slot="navbar-right-alt">
      <SocialLink type="twitter" href="https://twitter.com/myrmod" />
      <SocialLink type="gitHub" href="https://github.com/Myrmod/svelte-babylon" />
    </div>

    <footer slot="main-bottom">
      <a href="/privacy" sveltekit:prefetch>Privacy</a>
      <a href="/sitemap.xml" sveltekit:prefetch>Sitemap</a>
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
  :global([slot='navbar-right-alt']) {
    display: flex;
  }
</style>
