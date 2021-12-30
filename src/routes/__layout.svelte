<script lang="ts">
  import Header from '$lib/site/Header.svelte'
  import 'babylonjs-loaders'
</script>

<Header />
<slot />

<style global>
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  body {
    font-size: 1.6rem;
    padding: 0;
    margin: 0;
  }
</style>
