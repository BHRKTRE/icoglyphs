<script>
	import icoGlyphs from '$lib/index.js';
	import { goto } from '$app/navigation';
	import appState from '$lib/app/appState.svelte.js';

	let { icoGlyphName, size = 'medium' } = $props();

	const dimensions = {
		small: 60,
		medium: 130
	};

	function getIcoGlyphSlug() {
		if (icoGlyphs.library().svgData[icoGlyphName].aliases) {
			return icoGlyphs.library().svgData[icoGlyphName].aliases[0];
		} else {
			return icoGlyphName;
		}
	}

	// $inspect(appState.icoGlyphUserSettings.style);
</script>

<button
	onclick={() => goto(`/icon/${getIcoGlyphSlug()}`)}
	aria-label={`Navigate to '${getIcoGlyphSlug()}' icon page`}
	class="icoglyphContainer button-svg-only"
	style:width={`${dimensions[size]}px`}
	style:height={`${dimensions[size]}px`}
>
	<title id="icon-title">{getIcoGlyphSlug()} icon</title>
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
