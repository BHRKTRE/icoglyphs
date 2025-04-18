<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';

	import MorphingPath from '$lib/app/ui/components/MorphingPath.svelte';
	import icoGlyphs from '$lib/index.js';
	import { resetStyle } from '$lib/app/ui/utils/resetStyle.svelte.js';

	$effect(() => {
		const modesValues = Object.fromEntries(
			Object.entries(appState.modes).map(([key, data]) => [key, data.value])
		);

		localStorage.setItem('modes', JSON.stringify(modesValues));
	});
	/**
	 * ColorMode button
	 */

	function resetStyleForColorModeButton() {
		resetStyle();
	}

	function colorModeButtonAction() {
		if (appState.modes.colorMode.value === 'grey') {
			appState.modes.colorMode.value = 'dark';
			appState.modes.colorMode.change('dark');
			resetStyleForColorModeButton();
		} else if (appState.modes.colorMode.value === 'dark') {
			appState.modes.colorMode.value = 'light';
			appState.modes.colorMode.change('light');
			resetStyleForColorModeButton();
		} else {
			appState.modes.colorMode.value = 'grey';
			appState.modes.colorMode.change('grey');
			resetStyleForColorModeButton();
		}
	}
</script>

<button class="button-default navbar-button" onclick={colorModeButtonAction}>
	<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
		<MorphingPath IGName={appState.modes.colorMode.value} />
	</svg>
</button>

<style>
	.navbar-button {
		border: none;
		background: var(--b1);
	}

	.navbar-button:hover {
		background: var(--b2);
	}

	.navbar-button:active {
		background: var(--b4);
	}
</style>
