<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

	let togglePrivateIcoGlyphStatus = $state(appState.modes.showPrivateIcoGlyph.value);
	const togglePrivateIcoGlyph = () => {
		appState.modes.showPrivateIcoGlyph.toggle();
		togglePrivateIcoGlyphStatus = appState.modes.showPrivateIcoGlyph.value;
	};
</script>

<main>
	<div id="params-container">
		<div class="param-section">
			<h3>Private icoGlyphs display</h3>
			<div class="param-button-container">
				<button
					onclick={() => {
						togglePrivateIcoGlyph();
					}}
					class="text-button"><h5>{togglePrivateIcoGlyphStatus}</h5></button
				>
			</div>
		</div>
	</div>
	<div id="params-container">
		<div class="param-section">
			<h3>IcoGlypher mode</h3>
			<div class="param-button-container">
				<button
					onclick={() => {
						appState.modes.icoGlypherMode.toggleFunction();
					}}
					class="text-button"><h5>{appState.modes.icoGlypherMode.value}</h5></button
				>
			</div>
		</div>
	</div>
</main>

<style>
	#params-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.param-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: var(--spacing-medium);
		border: solid 1px var(--t1);
		border-radius: var(--border-radius);
		padding: var(--spacing-medium);
		width: 100%;
		gap: var(--spacing-medium);
	}
</style>
