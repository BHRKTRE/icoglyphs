<script>
	import appState from '$lib/app/appState.svelte.js';
	import psi from '$lib/app/utils/psi.js';
	import { resetStyle } from '$lib/app/utils/resetStyle.svelte.js';
	import BasicBlock from '$lib/app/components/BasicBlock.svelte';

	function actualiseLocalStorage(storageName, key, value) {
		let storedData = JSON.parse(localStorage.getItem(storageName)) || {};

		storedData[key] = value;

		localStorage.setItem(storageName, JSON.stringify(storedData));
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

		actualiseLocalStorage(
			'icoGlyphsUserStyle',
			'stroke-linecap',
			appState.icoGlyphUserSettings.style['stroke-linecap']
		);
		actualiseLocalStorage(
			'icoGlyphsUserStyle',
			'stroke-linejoin',
			appState.icoGlyphUserSettings.style['stroke-linejoin']
		);
	}

	let inputWidth = $derived(100 / psi + '%');

	/**
	 * Functions
	 */
	function resetStyleButtonAction() {
		localStorage.removeItem('icoGlyphsUserStyle');
		resetStyle();
	}
</script>

<BasicBlock>
	{#snippet subBlock()}
		<div class="mod-color-container">
			<div class="column-container">
				<label for="stroke-size"
					>Size: {appState.icoGlyphUserSettings.style['stroke-width']} px</label
				><input
					style="width: {inputWidth};"
					id="stroke-size"
					class="color-input"
					bind:value={appState.icoGlyphUserSettings.style['stroke-width']}
					oninput={() =>
						actualiseLocalStorage(
							'icoGlyphsUserStyle',
							'stroke-width',
							appState.icoGlyphUserSettings.style['stroke-width']
						)}
					min="0.3"
					max="9"
					step="0.1"
					type="range"
				/>
			</div>
		</div>

		<div class="mod-color-container">
			<div class="column-container" id="stroke-color-container">
				<label for="stroke-color-input" id="stroke-color-label">Color</label>
				<input
					style="width: {inputWidth};"
					id="stroke-color-input"
					class="color-input"
					type="color"
					bind:value={appState.icoGlyphUserSettings.style.stroke}
					oninput={() =>
						actualiseLocalStorage(
							'icoGlyphsUserStyle',
							'stroke',
							appState.icoGlyphUserSettings.style['stroke']
						)}
				/>
			</div>
		</div>

		<div class="small-button-container">
			<button onclick={changeStrokeType} class="button-text-only">
				Stroke style :
				{appState.icoGlyphUserSettings.style['stroke-linejoin']}
			</button>
		</div>
		<button onclick={resetStyleButtonAction} class="button-text-only">Reset style</button>
	{/snippet}
</BasicBlock>

<style>
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
	.small-button-container {
		display: flex;
		gap: var(--spacing-medium);
		width: 100%;
		justify-content: space-around;
	}
	#stroke-color-container {
		position: relative;
	}

	#stroke-color-input {
		height: 40px;
	}
</style>
