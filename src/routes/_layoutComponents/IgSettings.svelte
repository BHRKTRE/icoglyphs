<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

	$effect(() => {
		const modesValues = Object.fromEntries(
			Object.entries(appState.modes).map(([key, data]) => [key, data.value])
		);

		localStorage.setItem('modes', JSON.stringify(modesValues));
	});

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
	colorModeButton.add(
		'grey-mode',
		() => ((appState.modes.colorMode.value = 'dark'), appState.modes.colorMode.change('dark')),
		{
			to: 'dark-mode'
		}
	);
	colorModeButton.add(
		'dark-mode',
		() => ((appState.modes.colorMode.value = 'light'), appState.modes.colorMode.change('light')),
		{
			to: 'light-mode'
		}
	);
	colorModeButton.add(
		'light-mode',
		() => ((appState.modes.colorMode.value = 'grey'), appState.modes.colorMode.change('grey')),
		{
			to: 'grey-mode'
		}
	);
	let colorModeSelected = $state(`${appState.modes.colorMode.value}-mode`);

	/**
	 * devMode button
	 */
	let devModeButtonState = $state(`${appState.modes.devMode.value}`);
	function devModeButtonAction() {
		appState.modes.devMode.value = !appState.modes.devMode.value;
		devModeButtonState = `${appState.modes.devMode.value}`;
	}
	let devModeButton = $state(new icoGlyphButtonPropsConstructor());
	devModeButton.add(
		'dev',
		() => {
			devModeButtonAction();
		},
		{}
	);
	let devModeToggle = $state(new icoGlyphButtonPropsConstructor());
	devModeToggle.add('false', () => devModeButtonAction());
	devModeToggle.add('true', () => devModeButtonAction());

	/**
	 * icoGlypherMode button
	 */
	let icoGlypherModeButtonState = $state(`${appState.modes.icoGlypherMode.value}`);
	function icoGlypherButtonAction() {
		appState.modes.icoGlypherMode.value = !appState.modes.icoGlypherMode.value;
		icoGlypherModeButtonState = `${appState.modes.icoGlypherMode.value}`;
	}
	let icoGlypherModeButton = $state(new icoGlyphButtonPropsConstructor());
	icoGlypherModeButton.add('sky', () => icoGlypherButtonAction(), {});

	let icoGlypherModeToggle = $state(new icoGlyphButtonPropsConstructor());
	icoGlypherModeToggle.add('false', () => icoGlypherButtonAction(), {});
	icoGlypherModeToggle.add('true', () => icoGlypherButtonAction(), {});

	/**
	 * designerMode button
	 */
	let designerModeButtonState = $state(`${appState.modes.designerMode.value}`);
	function designerButtonAction() {
		appState.modes.designerMode.value = !appState.modes.designerMode.value;
		designerModeButtonState = `${appState.modes.designerMode.value}`;
		localStorage.removeItem('icoGlyphsUserStyle');
		appState.icoGlyphUserSettings.style = appState.icoGlyphUserSettings.updateUserStyles();
	}
	let designerModeButton = $state(new icoGlyphButtonPropsConstructor());
	designerModeButton.add('style', () => designerButtonAction(), {});

	let designerModeToggle = $state(new icoGlyphButtonPropsConstructor());
	designerModeToggle.add('false', () => designerButtonAction(), {});
	designerModeToggle.add('true', () => designerButtonAction(), {});

	// $inspect(appState.icoGlyphUserSettings.updateUserStyles());

	// colorModeButton hitbox too large
</script>

<button
	aria-label="Close settings"
	onclick={() => (appState.IgSetingsIsOpen = !appState.IgSetingsIsOpen)}
	id="background-overlay"
></button>
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
		<IcoGlyphButton {buttonStyle} buttonConfig={devModeToggle} bind:selected={devModeButtonState} />
	</div>

	<div class="param-section">
		<IcoGlyphButton {buttonStyle} buttonConfig={icoGlypherModeButton} />
		<IcoGlyphButton
			{buttonStyle}
			buttonConfig={icoGlypherModeToggle}
			bind:selected={icoGlypherModeButtonState}
		/>
	</div>

	<div class="param-section">
		<IcoGlyphButton {buttonStyle} buttonConfig={designerModeButton} />
		<IcoGlyphButton
			{buttonStyle}
			buttonConfig={designerModeToggle}
			bind:selected={designerModeButtonState}
		/>
	</div>
</div>

<style>
	#params-container {
		position: fixed;
		top: 70px;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--b1);
		border: 2px solid var(--t1);
		border-radius: var(--border-radius);
		padding: var(--spacing-small);
		z-index: 11;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	#background-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 10;
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
