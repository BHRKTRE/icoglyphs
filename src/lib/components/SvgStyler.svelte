<script>
	import globalVarFront from '$lib/globalVarFront.svelte.js';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let backgroundNone = $state(false);

	function actualiseLocalStorage() {
		localStorage.setItem(
			'icoGlyphsUserStyle',
			JSON.stringify(globalVarFront.icoGlyphUserSettings.style)
		);
	}

	// $inspect(getComputedStyle(document.documentElement).getPropertyValue('--t1'));
</script>

<div class="svg-styler-container">
	<div class="mod-color-container">
		<label for="stroke-color">Stroke color</label><input
			id="stroke-color"
			class="color-input"
			type="color"
			bind:value={globalVarFront.icoGlyphUserSettings.style.stroke}
			oninput={actualiseLocalStorage}
		/>
	</div>
	<div class="mod-color-container">
		<label for="stroke-size">Stroke size</label><input
			id="stroke-size"
			class="color-input"
			type="range"
		/>
	</div>
	<div class="mod-color-container">
		<label for="stroke-color">Background color</label><input
			min="0"
			max="10"
			step="0.5"
			value="2"
			id="stroke-color"
			class="color-input"
			type="checkbox"
			bind:checked={backgroundNone}
		/>
	</div>
	{#if backgroundNone}
		<div class="mod-color-container">
			<label for="background-color">BackGround</label><input
				id="background-color"
				class="color-input"
				type="color"
			/>
		</div>
	{/if}
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
