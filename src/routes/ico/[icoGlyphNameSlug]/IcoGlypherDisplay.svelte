<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import icoGlyphs from '$lib/index.js';

	let { icoGlyphName } = $props();
	$inspect(icoGlyphs.searchIcoGlyph(icoGlyphName));
</script>

{#if appState.modes.icoGlypherMode.value == true}
	<div class="basic-container">
		<code class="path-code">{icoGlyphs.library(icoGlyphName)}</code>
	</div>
	<div class="basic-container">
		<code class="path-code">{icoGlyphs.getPath(icoGlyphName)}</code>
	</div>
{/if}

<style>
	.basic-container {
		border: var(--border-width-medium) solid var(--b2);
	}
</style>
