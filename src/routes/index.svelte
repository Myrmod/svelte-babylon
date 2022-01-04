<script lang="ts" context="module">
  export async function load() {
    const files = import.meta.glob('/src/lib/components/**/Doc.svelte')

    return {
      status: 200,
      props: { files },
    }
  }
</script>

<script lang="ts">
  export let files: Record<
    string,
    () => Promise<{
      [key: string]: any
    }>
  >
</script>

<h1>Svelte Babylon</h1>

{#each Object.entries(files) as [name, promise]}
  {#await promise() then value}
    <section id={name.replace('/Doc.svelte', '').replace('/src/lib/components/', '')}>
      <svelte:component this={value.default} />
    </section>
  {/await}
{/each}

<style>
  h1 {
    display: none;
  }

  :global(section .canvas) {
    position: relative;
    width: 640px;
    height: 480px;
    max-width: 100vw;
    max-height: 100vh;
    aspect-ratio: 640/480;
  }
</style>
