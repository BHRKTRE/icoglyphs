<script>
	import BasicBlock from '$lib/app/ui/components/BasicBlock.svelte';
	import icoGlyphs from '$lib/index.js';
	import MorphingPath from '$lib/app/ui/components/MorphingPath.svelte';
	import appState from '$lib/app/core/stores/appState.svelte.js';

	let { data } = $props();
	// For import style
	// <div class="mod-color-container">
	// 			<label for="toggle-import-style">Import style when copying & downloading (SVG only)</label
	// 			><input
	// 				id="toggle-import-style"
	// 				class="color-input"
	// 				type="checkbox"
	// 				onchange={() =>
	// 					actualiseLocalStorage(
	// 						'useStyleForSvg',
	// 						appState.icoGlyphUserSettings.useStyleForSvg
	// 					)}
	// 				bind:checked={appState.icoGlyphUserSettings.useStyleForSvg}
	// 			/>
	// 		</div>

	function translateBooleanToIg(value) {
		return value ? 'true' : 'false';
	}

	function translateBooleanToString(value) {
		return value ? 'On' : 'Off';
	}

	// $inspect(appState.icoGlyphUserSettings.useStyleForSvg);
</script>

<BasicBlock>
	{#snippet subBlock()}
		<BasicBlock>
			{#snippet title()}
				<h3>Path</h3>
			{/snippet}
			{#snippet el()}
				<code>{icoGlyphs.getPath(data.name)}</code>
			{/snippet}
		</BasicBlock>
		<!-- <BasicBlock>
			{#snippet title()}
				<h3>Simplified path</h3>
			{/snippet}
			{#snippet text()}
				The path will be simplified. Most animations between icons will no longer be possible.
				However, this is useful for engraving or laser cutting.
			{/snippet}
			{#snippet subBlock()}
				<button class="button-default" onclick={() => console.log('test')}>
					<span>Off / On</span>
					<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
						<MorphingPath IGName={'on'} />
					</svg>
				</button>
			{/snippet}
		</BasicBlock> -->
		<BasicBlock>
			{#snippet title()}
				<h3>Import style</h3>
			{/snippet}
			{#snippet text()}
				Import the style of the icon when copying and downloading SVG.
			{/snippet}
			{#snippet subBlock()}
				<button
					class="button-default"
					onclick={() =>
						(appState.icoGlyphUserSettings.useStyleForSvg =
							!appState.icoGlyphUserSettings.useStyleForSvg)}
				>
					<span>{translateBooleanToString(appState.icoGlyphUserSettings.useStyleForSvg)}</span>
					<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
						<MorphingPath
							IGName={translateBooleanToIg(appState.icoGlyphUserSettings.useStyleForSvg)}
						/>
					</svg>
				</button>
			{/snippet}
		</BasicBlock>
	{/snippet}
</BasicBlock>

<style>
</style>
