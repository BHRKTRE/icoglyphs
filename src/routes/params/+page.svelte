<script>
	import globalVarFront from '$lib/globalVarFront.svelte.js';

	let togglePrivateIcoGlyphStatus = $state(globalVarFront.showPrivateIcoGlyph.value);
	const togglePrivateIcoGlyph = () => {
		globalVarFront.showPrivateIcoGlyph.togglePrivateIcoGlyph();
		togglePrivateIcoGlyphStatus = globalVarFront.showPrivateIcoGlyph.value;
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
		<div class="param-section">
			<h3>Color mode</h3>
			<div class="param-button-container">
				<button
					onclick={() => {
						globalVarFront.colorMode.changeColorMode('light');
					}}
					class="text-button"><h5>Light</h5></button
				>
				<button
					onclick={() => {
						globalVarFront.colorMode.changeColorMode('grey');
					}}
					class="text-button"><h5>Grey</h5></button
				>
				<button
					onclick={() => {
						globalVarFront.colorMode.changeColorMode('dark');
					}}
					class="text-button"><h5>Dark</h5></button
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
		margin: 1rem;
		border: solid 1px var(--t1);
		border-radius: var(--border-radius);
		padding: 1rem;
		width: 100%;
		gap: 1rem;
	}
</style>
