<script>
	import icoGlyphs from 'icoglyphs';

	let { icoGlyphCat, icoGlyphName } = $props();

	function copySvgToClipBoard() {
		const svgText = icoGlyphs.getCompletSVG(icoGlyphCat, icoGlyphName);

		navigator.clipboard.writeText(svgText);
	}

	const ariaLabel = `Copy the SVG to clipboard.`;
</script>

<button class="text-button" aria-label={ariaLabel} onclick={copySvgToClipBoard}>
	<h3>Copy SVG to Clipboard</h3>
</button>

<style>
</style>
