<script>
	import icoGlyphs from '$lib/index.js';

	let { icoGlyphName } = $props();

	let tags = icoGlyphs.searchIcoGlyph(icoGlyphName)?.metadata?.tags;

	$inspect(tags);
</script>

{#if tags !== undefined}
	<div id="tags-container" class="border-1">
		<h5>Tags</h5>
		{#each tags as tag}
			<span class="border-2 tag">{tag}</span>
		{/each}
	</div>
{/if}

<style>
	.tag {
		color: var(--b4);
		padding: var(--spacing-small) var(--spacing-medium);

		font-weight: 500;
		font-size: 0.8rem;

		/* border-2 replication */
		border: var(--border-width-small) solid var(--b2);
		border-radius: var(--border-radius);
	}

	#tags-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--spacing-medium);

		position: relative;
		max-width: var(--max-width-medium);
		margin-top: 15px;
		padding: var(--spacing-medium);
	}

	h5 {
		position: absolute;
		top: -14px;
		background: var(--b1);
		padding: 0 var(--spacing-medium);
		z-index: 1;
		transform: translateX(-50%);
		left: 50%;
	}
</style>
