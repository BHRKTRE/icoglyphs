<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

	let colorModeButton = $state(new icoGlyphButtonPropsConstructor());
	colorModeButton.add(
		'c1e1c1__p_c_t__s_5_3___x___o__s_15_15',
		() => appState.designerMode.toggleFunction(),
		{ to: 'c1e1c1__p_c_t__s_5_3___x___o__s_8_8' }
	);
	colorModeButton.add(
		'c1e1c1__p_c_t__s_5_3___x___o__s_8_8',
		() => appState.designerMode.toggleFunction(),
		{ to: 'c1e1c1__p_c_t__s_5_3___x___o__s_15_15' }
	);

	let designerMode = JSON.parse(localStorage.getItem('designerMode')) || false;
	let buttonSelected = $state(
		designerMode ? 'c1e1c1__p_c_t__s_5_3___x___o__s_8_8' : 'c1e1c1__p_c_t__s_5_3___x___o__s_15_15'
	);

	// $inspect(buttonSelected);
</script>

<IcoGlyphButton buttonConfig={colorModeButton} bind:selected={buttonSelected} />
