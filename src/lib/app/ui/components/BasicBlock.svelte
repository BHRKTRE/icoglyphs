<script>
	let { title, text, el, subBlock } = $props();
</script>

<div class="block-container">
	{#if title}
		<div class="title-container">
			{@render title?.()}
		</div>
	{/if}
	{#if text}
		<div class="text-container">
			<p>{@render text?.()}</p>
		</div>
	{/if}
	{#if el}
		<div class="elements-container">
			{@render el?.()}
		</div>
	{/if}
	{#if subBlock}
		<div class="sub-block-container">
			{@render subBlock?.()}
		</div>
	{/if}
</div>

<style>
	.block-container {
		display: flex;
		flex-direction: column;

		border: var(--border-width-medium) solid var(--b2);
		border-radius: var(--border-radius);

		width: 100%;
		background: var(--b2);
	}

	.title-container {
		padding: var(--spacing-small) var(--spacing-medium);
	}

	.text-container {
		/* background: var(--b1); */
		padding: 0 var(--spacing-medium) var(--spacing-medium) var(--spacing-medium);
		border-radius: var(--border-radius);
	}

	p {
		text-align: start;
	}

	.elements-container {
		background: var(--b1);

		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		border-radius: var(--border-radius);

		padding: var(--spacing-medium);
		gap: var(--spacing-medium);
	}

	.sub-block-container {
		display: flex;
		flex-direction: column;
		padding: var(--spacing-medium);
		gap: var(--spacing-medium);
	}
</style>
