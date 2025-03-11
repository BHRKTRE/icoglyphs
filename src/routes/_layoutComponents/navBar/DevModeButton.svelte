<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

	let colorModeButton = $state(new icoGlyphButtonPropsConstructor());
	colorModeButton.add(
		'l__p_cl__d_bl_tr___x___l__p_cr__d_br_tr___x___o__s_15_15',
		() => appState.devMode.toggleFunction(),
		{ to: 'l__p_cl__d_bl_tr___x___l__p_cr__d_br_tr___x___o__s_8_8' }
	);
	colorModeButton.add(
		'l__p_cl__d_bl_tr___x___l__p_cr__d_br_tr___x___o__s_8_8',
		() => appState.devMode.toggleFunction(),
		{ to: 'l__p_cl__d_bl_tr___x___l__p_cr__d_br_tr___x___o__s_15_15' }
	);

	let devMode = JSON.parse(localStorage.getItem('devMode')) || false;
	let buttonSelected = $state(
		devMode
			? 'l__p_cl__d_bl_tr___x___l__p_cr__d_br_tr___x___o__s_8_8'
			: 'l__p_cl__d_bl_tr___x___l__p_cr__d_br_tr___x___o__s_15_15'
	);

	// $inspect(buttonSelected);
</script>

<IcoGlyphButton buttonConfig={colorModeButton} bind:selected={buttonSelected} />
