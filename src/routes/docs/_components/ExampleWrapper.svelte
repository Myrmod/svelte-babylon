<script lang="ts">
	let showExample = false
	export let text = 'Click to see example!'
	export let id: string = undefined

	function setShowExample() {
		showExample = true
	}
</script>

<div
	{id}
	class="example-wrapper"
	on:click={setShowExample}
	on:keyup={setShowExample}
	tabindex="0"
	role="button"
>
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
		background-color: #666;
		color: #fff;
	}
</style>
