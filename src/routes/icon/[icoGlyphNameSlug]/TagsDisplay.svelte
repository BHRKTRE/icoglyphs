<script>
	import icoGlyphs from '$lib/index.js';
	import BasicBlock from '$lib/app/ui/components/BasicBlock.svelte';
	import { tick } from 'svelte';

	let { icoGlyphName } = $props();

	let tags = $derived(icoGlyphs.searchIcoGlyph(icoGlyphName)?.metadata?.tags);

	// $inspect(icoGlyphName);
</script>

{#if tags !== undefined}
	<BasicBlock>
		{#snippet title()}
			<h3>Tags</h3>
		{/snippet}
		{#snippet text()}
			While a tag carries a whole universe of meaning, the list below helps to better understand the
			icon.
		{/snippet}
		{#snippet subBlock()}
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

		border: var(--border-width-small) solid var(--b1);
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
