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

{#each Object.values(files) as promise}
  {#await promise() then value}
    <svelte:component this={value.default} />
  {/await}
{/each}

<style>
  h1 {
    display: none;
  }
</style>
