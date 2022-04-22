<script lang="ts">
  let showExample = false
  export let text = 'Click to see example!'
</script>

<div class="example-wrapper" on:click={() => (showExample = true)}>
  {#if showExample}
    <slot>No Components added</slot>
  {:else}
    {text}
  {/if}
</div>

<style>
  .example-wrapper {
    position: relative;
    width: 48rem;
    height: 48rem;
    max-width: 100%;
    aspect-ratio: 1;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--kd-color-gray-soft);
    color: #fff;
  }
</style>
