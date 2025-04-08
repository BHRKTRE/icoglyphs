<script>
	let { title, text, buttons, subBlock } = $props();
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
	{#if buttons}
		<div class="buttons-container">
			{@render buttons?.()}
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
		background: var(--b1);
		padding: var(--spacing-medium);
		border-radius: var(--border-radius);
	}

	p {
		text-align: start;
	}

	.buttons-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;

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
