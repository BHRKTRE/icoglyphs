<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

	let togglePrivateIcoGlyphStatus = $state(appState.showPrivateIcoGlyph.value);
	const togglePrivateIcoGlyph = () => {
		appState.showPrivateIcoGlyph.togglePrivateIcoGlyph();
		togglePrivateIcoGlyphStatus = appState.showPrivateIcoGlyph.value;
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
		<div class="param-section"></div>
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
		margin: 1rem;
		border: solid 1px var(--t1);
		border-radius: var(--border-radius);
		padding: 1rem;
		width: 100%;
		gap: 1rem;
	}
</style>
