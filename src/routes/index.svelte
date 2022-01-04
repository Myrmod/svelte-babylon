<script lang="ts" context="module">
  import libraryElementStore from '$lib/site/libraryElementStore'

  export async function load() {
    const files = import.meta.glob('/src/lib/components/**/Doc.svelte')

    const fileNames = Object.keys(files).map(file =>
      file.replace('/Doc.svelte', '').replace('/src/lib/components/', ''),
    )

    libraryElementStore.set(fileNames)

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

<svelte:head>
  <title>Svelte Babylon</title>
</svelte:head>

{#each Object.entries(files) as [name, promise]}
  {#await promise() then value}
    <section id={name.replace('/Doc.svelte', '').replace('/src/lib/components/', '')}>
      <svelte:component this={value.default} />
    </section>
  {/await}
{/each}

<style>
  :global(section .canvas) {
    position: relative;
    width: 640px;
    height: 480px;
    max-width: 100vw;
    max-height: 100vh;
    aspect-ratio: 640/480;
  }
</style>
