<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

	let designerModeButton = $state(new icoGlyphButtonPropsConstructor());
	designerModeButton.add(
		'l__p_cl__d_bl_tr___x___l__p_cr__d_br_tr___x___o__s_15_15',
		() => appState.modes.devMode.toggle(),
		{ to: 'l__p_cl__d_bl_tr___x___l__p_cr__d_br_tr___x___o__s_8_8' }
	);
	designerModeButton.add(
		'l__p_cl__d_bl_tr___x___l__p_cr__d_br_tr___x___o__s_8_8',
		() => appState.modes.devMode.toggle(),
		{ to: 'l__p_cl__d_bl_tr___x___l__p_cr__d_br_tr___x___o__s_15_15' }
	);

	let buttonSelected = $state(
		appState.modes.devMode.value == true
			? 'l__p_cl__d_bl_tr___x___l__p_cr__d_br_tr___x___o__s_8_8'
			: 'l__p_cl__d_bl_tr___x___l__p_cr__d_br_tr___x___o__s_15_15'
	);

	// $inspect(appState.modes.devMode.value);
</script>

<IcoGlyphButton buttonConfig={designerModeButton} bind:selected={buttonSelected} />
