<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import { applySvgUserStyles } from '$lib/app/core/utils/applySvgUserStyles.svelte.js';
	import psi from '$lib/app/ui/utils/psi.js';
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

	function actualiseLocalStorage(storageName, value) {
		localStorage.setItem(storageName, JSON.stringify(value));
	}

	function resetStyle() {
		localStorage.removeItem('icoGlyphsUserStyle');
		applySvgUserStyles();
	}

	/**
	 * Stroke types settings
	 *
	 */
	const strokeTypes = ['round', 'bevel', 'miter'];
	function changeStrokeType() {
		let currentType = appState.icoGlyphUserSettings.style['stroke-linejoin'];
		let currentIndex = strokeTypes.indexOf(currentType);

		let nextIndex = (currentIndex + 1) % strokeTypes.length;
		appState.icoGlyphUserSettings.style['stroke-linejoin'] = strokeTypes[nextIndex];
		appState.icoGlyphUserSettings.style['stroke-linecap'] = strokeTypes[nextIndex];

		actualiseLocalStorage('icoGlyphsUserStyle', appState.icoGlyphUserSettings.style);
	}

	let inputWidth = $derived(100 / psi + '%');

	/**
	 * Display SvgStyle
	 *
	 */
	let displaySvgStyler = $state(false);
	let svgStylerPadding = $derived(
		displaySvgStyler ? '25px var(--spacing-medium) var(--spacing-medium) var(--spacing-medium)' : 0
	);
	let selectedButton = $state('deploy_style');
	/**
	 * Button for display SvgStyler
	 *
	 */
	let displaySvgStylerButton = new icoGlyphButtonPropsConstructor();
	displaySvgStylerButton.add('deploy_style', () => {
		displaySvgStyler = true;
		selectedButton = 'fold_style';
	});
	displaySvgStylerButton.add('fold_style', () => {
		displaySvgStyler = false;
		selectedButton = 'deploy_style';
	});

	// $inspect(100 / psi ** 7);s
</script>

<div id="displayButtonContainer">
	<IcoGlyphButton buttonConfig={displaySvgStylerButton} bind:selected={selectedButton} />
</div>
<div class="svg-styler-container" style:padding={svgStylerPadding}>
	{#if displaySvgStyler}
		<div class="mod-color-container">
			<div class="column-container" id="stroke-color-container">
				<label for="stroke-color-input" id="stroke-color-label">Stroke color</label>
				<input
					style="width: {inputWidth};"
					id="stroke-color-input"
					class="color-input"
					type="color"
					bind:value={appState.icoGlyphUserSettings.style.stroke}
					oninput={() =>
						actualiseLocalStorage('icoGlyphsUserStyle', appState.icoGlyphUserSettings.style)}
				/>
			</div>
		</div>
		<div class="mod-color-container">
			<div class="column-container">
				<label for="stroke-size"
					>Stroke size : {appState.icoGlyphUserSettings.style['stroke-width']} px</label
				><input
					style="width: {inputWidth};"
					id="stroke-size"
					class="color-input"
					bind:value={appState.icoGlyphUserSettings.style['stroke-width']}
					oninput={() =>
						actualiseLocalStorage('icoGlyphsUserStyle', appState.icoGlyphUserSettings.style)}
					min="0"
					max="16"
					step="0.1"
					type="range"
				/>
			</div>
		</div>
		<button onclick={changeStrokeType} class="text-button">
			Stroke style :
			{appState.icoGlyphUserSettings.style['stroke-linejoin']}
		</button>

		<div class="mod-color-container">
			<label for="toggle-import-style">Import style when copying & downloading (SVG only)</label
			><input
				id="toggle-import-style"
				class="color-input"
				type="checkbox"
				onchange={() =>
					actualiseLocalStorage(
						'useStyleForSvgDownload',
						appState.icoGlyphUserSettings.useStyleForSvgDownload
					)}
				bind:checked={appState.icoGlyphUserSettings.useStyleForSvgDownload}
			/>
		</div>

		<button onclick={resetStyle} class="text-button">Reset style</button>
	{/if}
</div>

<style>
	#displayButtonContainer {
		border: 5px solid var(--b1);
		border-radius: var(--border-radius);
		background: var(--b1);
		position: relative;
		bottom: -25px;
		z-index: 1;
		transition: 1s;
	}

	.svg-styler-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: var(--b2) var(--border-width-medium) solid;
		border-radius: var(--border-radius);
		width: 100%;
		gap: var(--spacing-medium);
		max-width: var(--max-width-medium);
		transition: 500ms;
	}

	.mod-color-container {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--b2);
		border-radius: var(--border-radius);
		width: 100%;
		padding: var(--spacing-medium);
		gap: var(--spacing-medium);
	}

	.column-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		gap: var(--spacing-medium);
	}

	#stroke-color-label {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
		background: var(--t2);
		padding: var(--spacing-small) var(--spacing-medium);
		border-radius: var(--border-radius);
	}

	#stroke-color-container {
		position: relative;
	}

	#stroke-color-input {
		height: 40px;
	}
</style>
