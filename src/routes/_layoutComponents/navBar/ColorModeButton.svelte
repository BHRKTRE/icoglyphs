<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

	let colorModeButton = $state(new icoGlyphButtonPropsConstructor());
	colorModeButton.add('grey-mode', () => appState.colorMode.changeColorMode('dark'), {
		to: 'dark-mode'
	});
	colorModeButton.add('dark-mode', () => appState.colorMode.changeColorMode('light'), {
		to: 'light-mode'
	});
	colorModeButton.add('light-mode', () => appState.colorMode.changeColorMode('grey'), {
		to: 'grey-mode'
	});

	let colorModeSelected = $state(
		localStorage.getItem('colorMode')
			? `${JSON.parse(localStorage.getItem('colorMode'))}-mode`
			: 'grey-mode'
	);

	// $inspect(colorModeSelected);
</script>

<IcoGlyphButton buttonConfig={colorModeButton} bind:selected={colorModeSelected} />
