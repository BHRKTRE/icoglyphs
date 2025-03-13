<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

	let designerModeButton = $state(new icoGlyphButtonPropsConstructor());
	designerModeButton.add(
		'c1e1c1__p_c_t__s_5_3___x___o__s_15_15',
		() => appState.modes.designerMode.toggle(),
		{ to: 'c1e1c1__p_c_t__s_5_3___x___o__s_8_8' }
	);
	designerModeButton.add(
		'c1e1c1__p_c_t__s_5_3___x___o__s_8_8',
		() => appState.modes.designerMode.toggle(),
		{ to: 'c1e1c1__p_c_t__s_5_3___x___o__s_15_15' }
	);

	let buttonSelected = $state(
		appState.modes.designerMode.value == true
			? 'c1e1c1__p_c_t__s_5_3___x___o__s_8_8'
			: 'c1e1c1__p_c_t__s_5_3___x___o__s_15_15'
	);

	// $inspect(appState.modes);
</script>

<IcoGlyphButton buttonConfig={designerModeButton} bind:selected={buttonSelected} />
