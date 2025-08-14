<script>
	import icoGlyphs from '$lib/icoglyphs.js';
	import BasicBlock from '$lib/app/components/BasicBlock.svelte';

	let { icoGlyphName } = $props();

	let tags = $derived(icoGlyphs.searchIcoGlyph(icoGlyphName)?.tags);

	// $inspect(tags.length);
</script>

{#if tags !== undefined && tags.length >= 1}
	<BasicBlock>
		{#snippet title()}
			<h2>Tags</h2>
		{/snippet}
		{#snippet text()}
			While a tag carries a whole universe of meaning, the list below helps to better understand the
			icon.
		{/snippet}
		{#snippet el()}
			<div id="tags-container">
				{#each tags as tag}
					<span class=" tag">{tag}</span>
				{/each}
			</div>
		{/snippet}
	</BasicBlock>
{/if}

<style>
	.tag {
		color: var(--t1);
		padding: var(--spacing-small) var(--spacing-medium);

		font-weight: 500;
		font-size: 0.8rem;

		border: var(--border-width-small) solid var(--b2);
		/* background: var(--b2); */
		border-radius: var(--border-radius);
	}

	#tags-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--spacing-medium);

		position: relative;
	}
</style>
