<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import icoGlyphs from '$lib/index.js';

	let { icoGlyphName } = $props();
	// $inspect(appState.modes.icoGlypherMode.value);
</script>

{#if appState.modes.icoGlypherMode.value == true}
	<div id="icoGlypher-display">
		<div class="basic-container">
			<code class="path-code">{icoGlyphs.searchIcoGlyph(icoGlyphName).key}</code>
		</div>
		<div class="basic-container">
			<code class="path-code">{icoGlyphs.getPath(icoGlyphName)}</code>
		</div>
	</div>
{/if}

<style>
	.basic-container {
		border: var(--border-width-medium) solid var(--b2);
	}

	#icoGlypher-display {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-medium);
	}
</style>
