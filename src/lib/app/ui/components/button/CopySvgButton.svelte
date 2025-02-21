<script>
	import icoGlyphs from '$lib/index.js';
	import appState from '$lib/app/core/stores/appState.svelte.js';

	let { icoGlyphName } = $props();

	let svgStyle = $derived.by(() => {
		if (appState.icoGlyphUserSettings.useStyleForSvgDownload === true) {
			return appState.icoGlyphUserSettings.style;
		} else {
			return '';
		}
	});

	let completSvg = $derived(`	<svg 
    ${Object.entries(icoGlyphs.getSvgAttributes(icoGlyphName))
			.map(([key, value]) => `${key}="${value}"`)
			.join(' ')}   
    ${Object.entries(svgStyle)
			.map(([key, value]) => `${key}="${value}"`)
			.join(' ')}>
    
			<path d='${icoGlyphs.getPath(icoGlyphName)}' />
		</svg>`);

	function copySvgToClipBoard() {
		navigator.clipboard.writeText(completSvg);
	}

	const ariaLabel = `Copy the SVG to clipboard.`;
</script>

<button class="text-button" aria-label={ariaLabel} onclick={copySvgToClipBoard}>
	Copy SVG to Clipboard
</button>

<style>
	button {
		width: 100%;
	}
</style>
