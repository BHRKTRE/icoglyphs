<script>
	import globalVarFront from '$lib/globalVarFront.svelte.js';
	import { applySvgUserStyles } from '$lib/design/applySvgUserStyles.svelte.js';

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
		let currentType = globalVarFront.icoGlyphUserSettings.style['stroke-linejoin'];
		let currentIndex = strokeTypes.indexOf(currentType);

		let nextIndex = (currentIndex + 1) % strokeTypes.length;
		globalVarFront.icoGlyphUserSettings.style['stroke-linejoin'] = strokeTypes[nextIndex];
		globalVarFront.icoGlyphUserSettings.style['stroke-linecap'] = strokeTypes[nextIndex];

		actualiseLocalStorage('icoGlyphsUserStyle', globalVarFront.icoGlyphUserSettings.style);
	}

	$inspect(globalVarFront.icoGlyphUserSettings.useStyleForSvgDownload);
</script>

<div class="svg-styler-container">
	<div class="mod-color-container">
		<label for="stroke-color">Stroke color</label><input
			id="stroke-color"
			class="color-input"
			type="color"
			bind:value={globalVarFront.icoGlyphUserSettings.style.stroke}
			oninput={() =>
				actualiseLocalStorage('icoGlyphsUserStyle', globalVarFront.icoGlyphUserSettings.style)}
		/>
	</div>
	<div class="mod-color-container">
		<label for="stroke-size"
			>Stroke size : {globalVarFront.icoGlyphUserSettings.style['stroke-width']}</label
		><input
			id="stroke-size"
			class="color-input"
			bind:value={globalVarFront.icoGlyphUserSettings.style['stroke-width']}
			oninput={() =>
				actualiseLocalStorage('icoGlyphsUserStyle', globalVarFront.icoGlyphUserSettings.style)}
			min="0"
			max="16"
			step="0.4"
			type="range"
		/>
	</div>
	<button onclick={changeStrokeType} class="text-button">
		Stroke style :
		{globalVarFront.icoGlyphUserSettings.style['stroke-linejoin']}
	</button>

	<div class="mod-color-container">
		<label for="toggle-import-style">Import style</label><input
			id="toggle-import-style"
			class="color-input"
			type="checkbox"
			onchange={() =>
				actualiseLocalStorage(
					'useStyleForSvgDownload',
					globalVarFront.icoGlyphUserSettings.useStyleForSvgDownload
				)}
			bind:checked={globalVarFront.icoGlyphUserSettings.useStyleForSvgDownload}
		/>
	</div>

	<button onclick={resetStyle} class="text-button">Reset style</button>
</div>

<style>
	.svg-styler-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20px;
		border: var(--b2) 3px solid;
		border-radius: var(--br);
		width: 100%;
		gap: 15px;
	}

	.color-input {
		margin-left: 10px;
	}
</style>
