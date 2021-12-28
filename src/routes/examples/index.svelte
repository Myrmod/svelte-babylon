<script lang="ts" context="module">
  export async function load({ fetch }) {
    const items = await fetch('/api/example-routes')

    return {
      status: 200,
      props: {
        items: await items.json(),
      },
    }
  }
</script>

<script lang="ts">
  export let items: Array<string> = []
</script>

<h1>Examples</h1>
<ul>
  {#each items as item}
    <li>
      <a href={`/examples/${item}`}>{item}</a>
    </li>
  {/each}
</ul>
