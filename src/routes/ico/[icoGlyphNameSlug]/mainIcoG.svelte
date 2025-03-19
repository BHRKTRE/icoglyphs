<script>
	import icoGlyphs from '$lib/index.js';
	import appState from '$lib/app/core/stores/appState.svelte.js';

	let { IGname } = $props();

	// let divBackground = $derived(appState.modes.designerMode.value == true ? damier : 'inherit');

	let checkerboard = $state(appState.modes.designerMode.value);

	// $inspect(JSON.parse(localStorage.getItem('icoGlyphsUserStyle')));
</script>

<div id="icoglyph-container" class:checkerboard>
	<svg {...appState.icoGlyphUserSettings.style} {...icoGlyphs.getSvgAttributes(IGname)}>
		<path d={icoGlyphs.getPath(IGname)} />
	</svg>
</div>

<style>
	#icoglyph-container {
		width: 100%;
		height: 100%;
		border: var(--b2) var(--border-width-medium) solid;
		border-radius: var(--border-radius);
		max-width: var(--max-width-medium);
	}

	.checkerboard {
		--color1: hsl(0 0% 40%);
		--color2: hsl(0 0% 50%);
		--size: 22px;

		width: 500px;
		height: 500px;

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
