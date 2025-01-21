<script>
	import icoGlyphs from 'icoglyphs';
	let { data } = $props();

	// $inspect(data);
</script>

<main>
	<div class="icoglyph-container">
		<svg {...icoGlyphs.getSvgAttributes(data.name)}>
			<path d={icoGlyphs.getPath(data.name)} />
		</svg>
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.icoglyph-container {
		width: 100%;
		height: 100%;

		border: rgb(141, 116, 116) 1px solid;
		margin: 5px;
		border-radius: 5%;
	}
</style>
