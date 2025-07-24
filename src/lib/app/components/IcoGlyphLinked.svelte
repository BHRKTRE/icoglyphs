<script>
	import icoGlyphs from '$lib/icoglyphs.js';
	import { goto } from '$app/navigation';
	import appState from '$lib/app/appState.svelte.js';

	let { icoGlyphName, size = 'medium' } = $props();

	const dimensions = {
		small: 60,
		medium: 130
	};

	// $inspect(getIcoGlyphSlug());
</script>

<button
	onclick={() => goto(`/icon/${icoGlyphName}`)}
	aria-label={`Navigate to '${icoGlyphName}' icon page`}
	class="icoglyphContainer button-svg-only"
	style:width={`${dimensions[size]}px`}
	style:height={`${dimensions[size]}px`}
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
	svg {
		height: 100%;
		width: 100%;
	}
</style>
