<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import icoGlyphs from '$lib/index.js';

	let { icoGlyphName } = $props();
	// $inspect(icoGlyphName);
</script>

{#if appState.icoGlypherMode.value}
	<div class="basic-container">
		<code class="path-code">{icoGlyphs.getPath(icoGlyphName)}</code>
	</div>
{/if}

<style>
	.basic-container {
		border: var(--border-width-medium) solid var(--b2);
	}
</style>
