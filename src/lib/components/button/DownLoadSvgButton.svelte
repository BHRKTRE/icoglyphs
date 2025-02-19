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

	function downloadSvg() {
		const blob = new Blob([completSvg], { type: 'image/svg+xml' });

		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${icoGlyphName}.svg`;
		document.body.appendChild(a);
		a.click();

		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	const ariaLabel = `Download the SVG file.`;
</script>

<button class="text-button" aria-label={ariaLabel} onclick={downloadSvg}>
	<h3>Download SVG</h3>
</button>

<style>
	button {
		width: 100%;
	}
</style>
