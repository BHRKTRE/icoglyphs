<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import psi from '$lib/app/ui/utils/psi.js';
	import { resetStyle } from '$lib/app/ui/utils/resetStyle.svelte.js';
	import BasicBlock from '$lib/app/ui/components/BasicBlock.svelte';

	function actualiseLocalStorage(storageName, key, value) {
		let storedData = JSON.parse(localStorage.getItem(storageName)) || {};

		storedData[key] = value;

		localStorage.setItem(storageName, JSON.stringify(storedData));
	}
</script>

{#if appState.modes.devMode.value == true}
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
{/if}

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
</style>
