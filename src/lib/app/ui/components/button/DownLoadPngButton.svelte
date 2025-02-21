<script>
	import icoGlyphs from '$lib/index.js';
	import { derived } from 'svelte/store';
	import appState from '$lib/app/core/stores/appState.svelte.js';

	let { icoGlyphName } = $props();

	let SvgAttributes = $derived(icoGlyphs.getSvgAttributes(icoGlyphName));

	let completSvg = $derived(`
		<svg 
			${Object.entries(SvgAttributes)
				.map(([key, value]) => `${key}="${value}"`)
				.join(' ')}
			style="${Object.entries(appState.icoGlyphUserSettings.style)
				.map(([key, value]) => `${key}:${value}`)
				.join(';')}">
			<path d='${icoGlyphs.getPath(icoGlyphName)}' />
		</svg>`);

	function downloadPng() {
		// Create an offscreen canvas
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		// Set canvas size based on viewBox
		const viewBox = SvgAttributes.viewBox.split(' ').map(Number);
		const width = viewBox[2];
		const height = viewBox[3];

		canvas.width = width * 10; // Increase resolution if needed
		canvas.height = height * 10;

		// Convert SVG string to image
		const img = new Image();
		const svgBlob = new Blob([completSvg], { type: 'image/svg+xml' });
		const url = URL.createObjectURL(svgBlob);

		img.onload = () => {
			context.drawImage(img, 0, 0, canvas.width, canvas.height);

			// Convert canvas to PNG and trigger download
			canvas.toBlob((blob) => {
				const pngUrl = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = pngUrl;
				a.download = `${icoGlyphName}.png`;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(pngUrl);
			}, 'image/png');

			URL.revokeObjectURL(url);
		};

		img.src = url;
	}

	const ariaLabel = `Download the PNG file.`;
</script>

<button class="text-button" aria-label={ariaLabel} onclick={downloadPng}> Download PNG </button>

<style>
	button {
		width: 100%;
	}
</style>
