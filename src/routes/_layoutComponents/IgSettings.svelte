<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import MorphingPath from '$lib/app/ui/components/MorphingPath.svelte';
	import icoGlyphs from '$lib/index.js';
	import { resetStyle } from '$lib/app/ui/utils/resetStyle.svelte.js';
	import BasicBlock from '$lib/app/ui/components/BasicBlock.svelte';

	//------

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
		if (!appState.modes.designerMode.value) {
			resetStyle();
		}
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

	/**
	 * devMode button
	 */
	let devModeButtonState = $state(`${appState.modes.devMode.value}`);
	function devModeButtonAction() {
		appState.modes.devMode.value = !appState.modes.devMode.value;
		devModeButtonState = `${appState.modes.devMode.value}`;
	}

	/**
	 * icoGlypherMode button
	 */
	let icoGlypherModeButtonState = $state(`${appState.modes.icoGlypherMode.value}`);
	function icoGlypherButtonAction() {
		appState.modes.icoGlypherMode.value = !appState.modes.icoGlypherMode.value;
		icoGlypherModeButtonState = `${appState.modes.icoGlypherMode.value}`;
	}

	/**
	 * designerMode button
	 */
	let designerModeButtonState = $state(`${appState.modes.designerMode.value}`);
	function designerButtonAction() {
		appState.modes.designerMode.value = !appState.modes.designerMode.value;
		designerModeButtonState = `${appState.modes.designerMode.value}`;
		localStorage.removeItem('icoGlyphsUserStyle');
		resetStyle();
	}

	/**
	 * Converts a boolean to the string 'activated' or 'deactivated'
	 */
	function translateBooleanToString(value) {
		return value ? 'Enabled' : 'Disabled';
	}
</script>

<button
	aria-label="Close settings"
	onclick={() => (appState.IgSettingsIsOpen = !appState.IgSettingsIsOpen)}
	id="background-overlay"
></button>
<div id="settings-wrapper">
	<svg class="svg-default" {...icoGlyphs.getSvgAttributes()} id="close-button">
		<MorphingPath IGName={'off'} />
	</svg>
	<div id="settings-container">
		<BasicBlock>
			{#snippet title()}
				<h2>Settings</h2>
			{/snippet}
			{#snippet subBlock()}
				<BasicBlock>
					{#snippet title()}
						<h3>Color Mode</h3>
					{/snippet}
					{#snippet text()}
						Select your preferred color mode: light, dark, or grey.
					{/snippet}
					{#snippet el()}
						<button class="button-default" onclick={colorModeButtonAction}>
							<span>Color mode : {appState.modes.colorMode.value}</span>
							<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
								<MorphingPath IGName={appState.modes.colorMode.value} />
							</svg>
						</button>
					{/snippet}
				</BasicBlock>
				<BasicBlock>
					{#snippet title()}
						<h3>Interface Modes</h3>
					{/snippet}
					{#snippet text()}
						Enable or disable advanced interface modes to suit your workflow in the icons pages .
					{/snippet}
					{#snippet el()}
						<BasicBlock>
							{#snippet title()}
								<h4>Designer Mode</h4>
							{/snippet}
							{#snippet text()}
								Access advanced tools for stroke customization, color editing, and export to SVG
								format.
							{/snippet}
							{#snippet el()}
								<button class="button-default" onclick={designerButtonAction}>
									<span
										>Designer Mode {translateBooleanToString(
											appState.modes.designerMode.value
										)}</span
									>
									<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
										<MorphingPath IGName={'style'} />
									</svg>
									<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
										<MorphingPath IGName={designerModeButtonState} />
									</svg>
								</button>
							{/snippet}
						</BasicBlock>
						<BasicBlock>
							{#snippet title()}
								<h4>Developer Mode</h4>
							{/snippet}
							{#snippet text()}
								The API is not yet available, but Developer Mode allows you to copy icons as
								SVG—with or without styles—directly to your clipboard.
							{/snippet}
							{#snippet el()}
								<button class="button-default" onclick={devModeButtonAction}>
									<span
										>Developer Mode {translateBooleanToString(appState.modes.devMode.value)}</span
									>
									<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
										<MorphingPath IGName={'dev'} />
									</svg>
									<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
										<MorphingPath IGName={devModeButtonState} />
									</svg>
								</button>
							{/snippet}
						</BasicBlock>
					{/snippet}
				</BasicBlock>
			{/snippet}
		</BasicBlock>
	</div>
</div>

<style>
	#settings-wrapper {
		position: relative;
		position: fixed;
		top: 10vh;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--b1);
		border: var(--border-width-small) solid var(--t1);
		border-radius: var(--border-radius);
		z-index: 11;
		max-width: 700px;
		width: 90vw;
	}

	#close-button {
		position: fixed;
		height: 30px;
		top: -40px;
		right: 0px;
		z-index: 12;
		cursor: pointer;
		pointer-events: none;
	}

	#settings-container {
		max-height: calc(100vh - 100px);
		overflow-y: auto;
		overscroll-behavior: contain;
	}

	@media (max-width: 900px) {
		#settings-container {
			width: 90vw;
		}
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
</style>
