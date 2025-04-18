<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import BasicBlock from '$lib/app/ui/components/BasicBlock.svelte';

	function actualiseLocalStorage(storageName, key, value) {
		let storedData = JSON.parse(localStorage.getItem(storageName)) || {};

		storedData[key] = value;

		localStorage.setItem(storageName, JSON.stringify(storedData));
	}
</script>

<BasicBlock>
	{#snippet subBlock()}
		<p>API is coming...</p>
		<!-- <div class="mod-color-container">
				<label for="toggle-import-style">API IS COMING</label><input
					id="toggle-import-style"
					class="color-input"
					type="checkbox"
					onchange={() =>
						actualiseLocalStorage(
							'useStyleForSvg',
							appState.icoGlyphUserSettings.useStyleForSvg
						)}
					bind:checked={appState.icoGlyphUserSettings.useStyleForSvg}
				/>
			</div> -->
	{/snippet}
</BasicBlock>
