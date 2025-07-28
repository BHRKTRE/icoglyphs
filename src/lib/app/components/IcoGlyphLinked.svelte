<script>
	import icoGlyphs from '$lib/icoglyphs.js';
	import { goto } from '$app/navigation';
	import appState from '$lib/app/appState.svelte.js';

	let { icoGlyphName } = $props();

	// $inspect(getIcoGlyphSlug());
</script>

<button
	onclick={() => goto(`/icon/${icoGlyphName}`)}
	aria-label={`Navigate to '${icoGlyphName}' icon page`}
	class="icoglyphContainer button-svg-only"
>
	<title id="icon-title">{icoGlyphName} icon</title>
	<svg
		role="img"
		aria-labelledby="icon-title"
		{...appState.icoGlyphUserSettings.style}
		{...icoGlyphs.getSvgAttributes()}
	>
		<path d={icoGlyphs.getPath(icoGlyphName)} />
	</svg>
</button>

<style>
	button {
		aspect-ratio: 1/1;
	}
	svg {
		height: 100%;
		width: 100%;
	}
</style>
