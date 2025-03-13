<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

	let colorModeButton = $state(new icoGlyphButtonPropsConstructor());
	colorModeButton.add('grey-mode', () => appState.modes.colorMode.change('dark'), {
		to: 'dark-mode'
	});
	colorModeButton.add('dark-mode', () => appState.modes.colorMode.change('light'), {
		to: 'light-mode'
	});
	colorModeButton.add('light-mode', () => appState.modes.colorMode.change('grey'), {
		to: 'grey-mode'
	});

	let colorModeSelected = $state(`${appState.modes.colorMode.value}-mode`);

	// $inspect(colorModeSelected);
</script>

<IcoGlyphButton buttonConfig={colorModeButton} bind:selected={colorModeSelected} />
