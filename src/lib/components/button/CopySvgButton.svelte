<script>
	import icoGlyphs from '$lib/index.js';
	import globalVarFront from '$lib/globalVarFront.svelte.js';

	let { icoGlyphName } = $props();

	let svgStyle = $derived.by(() => {
		if (globalVarFront.icoGlyphUserSettings.useStyleForSvgDownload === true) {
			return globalVarFront.icoGlyphUserSettings.style;
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
		console.log(completSvg);
	}

	const ariaLabel = `Copy the SVG to clipboard.`;

	$inspect(globalVarFront.icoGlyphUserSettings.useStyleForSvgDownload);
</script>

<button class="text-button" aria-label={ariaLabel} onclick={copySvgToClipBoard}>
	<h3>Copy SVG to Clipboard</h3>
</button>

<style>
</style>
