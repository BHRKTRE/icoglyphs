<script>
	import icoGlyphs from '$lib/index.js';

	let { icoGlyphName } = $props();

	function copySvgToClipBoard() {
		const svgText = icoGlyphs.getCompletSVG(icoGlyphName);

		navigator.clipboard.writeText(svgText);
	}

	const ariaLabel = `Copy the SVG to clipboard.`;
</script>

<button class="text-button" aria-label={ariaLabel} onclick={copySvgToClipBoard}>
	<h3>Copy SVG to Clipboard</h3>
</button>

<style>
</style>
