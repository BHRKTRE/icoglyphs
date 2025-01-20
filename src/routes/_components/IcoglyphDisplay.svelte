<script>
	import icoGlyphs from 'icoglyphs';

	let { icoGlyphName } = $props();

	const link = `/${icoGlyphName}`;

	// $inspect(icoGlyphName);
</script>

<div class="icoglyphContainer">
	<svg {...icoGlyphs.getSvgAttributes(icoGlyphName)}>
		<path d={icoGlyphs.getPath(icoGlyphName)} />
	</svg>
</div>
<a href={link}>{icoGlyphName}</a>

<style>
	svg {
		stroke-width: 3px;
		stroke: rgb(233, 208, 208);
		fill: none;
	}
	.icoglyphContainer {
		width: 150px;
		height: 150px;

		border: rgb(141, 116, 116) 1px solid;
		margin: 5px;
		border-radius: 5%;
	}
</style>
