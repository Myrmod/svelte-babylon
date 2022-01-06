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

  let visibleCanvases: Array<number> = []
  function setVisible(index: number) {
    if (!visibleCanvases.includes(index)) {
      visibleCanvases = [...visibleCanvases, index]
    }
  }
</script>

<svelte:head>
  <title>Svelte Babylon</title>
</svelte:head>

<div>
  {#each Object.entries(files).map(values => [values[0]
      .replace('/Doc.svelte', '')
      .replace('/src/lib/components/', ''), values[1]]) as [name, promise], index}
    {#await promise() then value}
      <section on:click={() => setVisible(index)} id={name}>
        {#if visibleCanvases.includes(index)}
          <svelte:component this={value.default} />
        {:else}
          <h1>{name}</h1>
          <button class="canvas" type="button" aria-label={`show ${name} example`} />
        {/if}
      </section>
    {/await}
  {/each}
</div>

<style>
  section {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 640px;
    height: 480px;
    max-width: 100vw;
    max-height: 100vh;
    aspect-ratio: 640/480;
    margin-bottom: 2rem;
  }

  div {
    padding: 0 2rem;
  }

  :global(.canvas) {
    position: relative;
    background-color: #333;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
