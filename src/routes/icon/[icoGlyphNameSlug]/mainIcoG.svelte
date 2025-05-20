<script>
	import icoGlyphs from '$lib/index.js';
	import appState from '$lib/app/appState.svelte.js';

	let { data } = $props();

	let checkerboard = $state(true);

	// $inspect(appState.icoGlyphUserSettings.style);
</script>

<div id="icoglyph-container" class={checkerboard ? 'checkerboard' : ' '}>
	<svg
		role="img"
		aria-labelledby="icon-title"
		{...appState.icoGlyphUserSettings.style}
		{...icoGlyphs.getSvgAttributes(data.name)}
	>
		<title id="icon-title">{data.aliases?.[0] || 'Unnamed'} icon</title>
		<path d={icoGlyphs.getPath(data.name)} />
	</svg>
</div>

<style>
	#icoglyph-container {
		width: 100%;
		aspect-ratio: 1 / 1;
		border: var(--b2) var(--border-width-medium) solid;
		border-radius: var(--border-radius);
	}

	.checkerboard {
		--color1: hsl(0 0% 40%);
		--color2: hsl(0 0% 50%);
		--size: 22px;

		background-image: linear-gradient(
				45deg,
				var(--color1) 25%,
				transparent 25%,
				transparent 75%,
				var(--color1) 75%
			),
			linear-gradient(
				45deg,
				var(--color1) 25%,
				var(--color2) 25%,
				var(--color2) 75%,
				var(--color1) 75%
			);

		background-size: var(--size) var(--size);

		background-position:
			0 0,
			calc(var(--size) / 2) calc(var(--size) / 2);
	}
</style>
