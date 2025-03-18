<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

	/**
	 * Button Style
	 */
	const buttonStyle = {
		background: 'none'
	};

	/**
	 * ColorMode button
	 */
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

	/**
	 * devMode button
	 */
	let devModeButton = $state(new icoGlyphButtonPropsConstructor());
	devModeButton.add('dev', () => appState.modes.devMode.toggle(), {});

	let devModeToggle = $state(new icoGlyphButtonPropsConstructor());
	devModeToggle.add('false', () => appState.modes.devMode.toggle(), {});
	devModeToggle.add('true', () => appState.modes.devMode.toggle(), {});
	let devModeValue = $state(`${appState.modes.devMode.value}`);

	/**
	 * icoGlypherMode button
	 */
	let icoGlypherModeButton = $state(new icoGlyphButtonPropsConstructor());
	icoGlypherModeButton.add('sky', () => appState.modes.icoGlypherMode.toggle(), {});

	let icoGlypherModeToggle = $state(new icoGlyphButtonPropsConstructor());
	icoGlypherModeToggle.add('false', () => appState.modes.icoGlypherMode.toggle(), {});
	icoGlypherModeToggle.add('true', () => appState.modes.icoGlypherMode.toggle(), {});

	/**
	 * designerMode button
	 */
	let designerModeButton = $state(new icoGlyphButtonPropsConstructor());
	designerModeButton.add('style', () => appState.modes.designerMode.toggle(), {});

	let designerModeToggle = $state(new icoGlyphButtonPropsConstructor());
	designerModeToggle.add('false', () => appState.modes.designerMode.toggle(), {});
	designerModeToggle.add('true', () => appState.modes.designerMode.toggle(), {});

	// $inspect(devModeValue);
</script>

<div id="params-container">
	<div class="param-section">
		<IcoGlyphButton
			{buttonStyle}
			buttonConfig={colorModeButton}
			bind:selected={colorModeSelected}
		/>
	</div>

	<div class="param-section">
		<IcoGlyphButton {buttonStyle} buttonConfig={devModeButton} />
		<IcoGlyphButton {buttonStyle} buttonConfig={devModeToggle} bind:selected={devModeValue} />
	</div>

	<div class="param-section">
		<IcoGlyphButton {buttonStyle} buttonConfig={icoGlypherModeButton} />
		<IcoGlyphButton {buttonStyle} buttonConfig={icoGlypherModeToggle} />
	</div>

	<div class="param-section">
		<IcoGlyphButton {buttonStyle} buttonConfig={designerModeButton} />
		<IcoGlyphButton {buttonStyle} buttonConfig={designerModeToggle} />
	</div>
</div>

<style>
	#params-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.param-section {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin: var(--spacing-medium);
		background: var(--b2);
		/* border: solid 1px var(--t1); */
		border-radius: var(--border-radius);
		/* padding: var(--spacing-medium);
		gap: var(--spacing-medium); */
	}

	.param-section:hover {
		background: var(--b3);
	}

	.param-section:active {
		background: var(--b4);
	}
</style>
