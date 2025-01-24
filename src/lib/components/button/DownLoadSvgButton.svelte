<script>
	import icoGlyphs from 'icoglyphs';

	let { icoGlyphCat, icoGlyphName } = $props();

	let SvgAttributes = $state({
		xmlns: 'http://www.w3.org/2000/svg',
		viewBox: '-50 -50 100 100',
		focusable: false, // ?
		'data-icoGlyph': icoGlyphName,
		role: 'img'
	});

	let svgStyle = $state({
		stroke: 'black',
		'stroke-linejoin': 'round',
		'stroke-linecap': 'round',
		'stroke-width': '0.4rem',
		'stroke-opacity': 1,
		fill: 'none'
	});

	const completSvg = `	<svg 
    ${Object.entries(SvgAttributes)
			.map(([key, value]) => `${key}="${value}"`)
			.join(' ')}   
    ${Object.entries(svgStyle)
			.map(([key, value]) => `${key}="${value}"`)
			.join(' ')}>
    
			<path d='${icoGlyphs.getPath(icoGlyphCat, icoGlyphName)}' />
		</svg>`;

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
