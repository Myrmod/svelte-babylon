<script lang='ts'>
  import { page } from '$app/stores';

  import { KitDocs, createKitDocsLoader, createSidebarContext } from '@svelteness/kit-docs';

  /** @type {import('@svelteness/kit-docs').MarkdownMeta | null} */
  export let meta = null;

  /** @type {import('@svelteness/kit-docs').ResolvedSidebarConfig | null} */
  export let sidebar = null;

  const { activeCategory } = createSidebarContext(sidebar);

  $: category = $activeCategory ? `${$activeCategory}: ` : '';
  $: title = meta ? `${category}${meta.title} | Svelte-Babylon` : null;
  $: description = meta?.description;
</script>

<svelte:head>
  {#key $page.url.pathname}
    {#if title}
      <title>{title}</title>
    {/if}
    {#if description}
      <meta name="description" content={description} />
    {/if}
  {/key}
</svelte:head>

<KitDocs {meta}>
  <slot />
  <!-- <KitDocsLayout {navbar} {sidebar}>
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
  </KitDocsLayout> -->
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
