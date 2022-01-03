<script lang="ts" context="module">
  export async function load() {
    const files = Object.keys(import.meta.glob('/src/routes/examples/**/*.svelte')).map(file =>
      file.replace('/src/routes/examples/', '').replace('.svelte', ''),
    )

    return {
      status: 200,
      props: { files },
    }
  }
</script>

<script lang="ts">
  export let files: Array<string>

  console.log(files)
</script>

<h1>Examples</h1>

<ul>
  {#each files as file}
    {#if file !== 'index'}
      <li>
        <a href={`/examples/${file}`}>{file}</a>
      </li>
    {/if}
  {/each}
</ul>
