<script>
	let { tabs, content, selected = $bindable() } = $props();

	// $inspect(selected);
</script>

<div class="block-container">
	<div id="top-container">
		{#each tabs as tab}
			<button
				class:is-selected={tab === selected}
				onclick={() => {
					selected = tab;
				}}
			>
				<h2>{tab}</h2>
			</button>
		{/each}
	</div>
	<div class="content-container">
		{@render content(selected)}
	</div>
</div>

<style>
	.block-container {
		display: flex;
		flex-direction: column;

		border: var(--border-width-medium) solid var(--b2);
		border-radius: var(--border-radius);

		padding: var(--spacing-medium);
		width: 100%;
		background: var(--b2);
	}

	button {
		background: var(--b2);
		border-radius: var(--border-radius) var(--border-radius) 0 0;
		border: none;
		padding: var(--spacing-small) var(--spacing-medium);
		border: var(--border-width-medium) solid var(--b1);
	}

	button.is-selected {
		background: var(--b1);
	}

	.content-container {
		padding: var(--spacing-medium);
		background: var(--b1);
		border-radius: 0 var(--border-radius) var(--border-radius) var(--border-radius);
	}
</style>
