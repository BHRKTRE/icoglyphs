<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import BasicBlock from '$lib/app/ui/components/BasicBlock.svelte';
	import icoGlyphs from '$lib/index.js';
	import MorphingPath from '$lib/app/ui/components/MorphingPath.svelte';

	// For import style
	// <div class="mod-color-container">
	// 			<label for="toggle-import-style">Import style when copying & downloading (SVG only)</label
	// 			><input
	// 				id="toggle-import-style"
	// 				class="color-input"
	// 				type="checkbox"
	// 				onchange={() =>
	// 					actualiseLocalStorage(
	// 						'useStyleForSvgDownload',
	// 						appState.icoGlyphUserSettings.useStyleForSvgDownload
	// 					)}
	// 				bind:checked={appState.icoGlyphUserSettings.useStyleForSvgDownload}
	// 			/>
	// 		</div>

	let { data } = $props();
</script>

<BasicBlock>
	{#snippet subBlock()}
		<BasicBlock>
			{#snippet title()}
				<h4>Path</h4>
			{/snippet}
			{#snippet el()}
				<code>{icoGlyphs.getPath(data.name)}</code>
			{/snippet}
		</BasicBlock>
		<BasicBlock>
			{#snippet title()}
				<h4>Simplified path</h4>
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
		</BasicBlock>
		<BasicBlock>
			{#snippet title()}
				<h4>Import style</h4>
			{/snippet}
			{#snippet text()}
				Import the style of the icon when copying and downloading.
			{/snippet}
			{#snippet subBlock()}
				<button class="button-default" onclick={() => console.log('test')}>
					<span>Off / On</span>
					<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
						<MorphingPath IGName={'on'} />
					</svg>
				</button>
			{/snippet}
		</BasicBlock>
	{/snippet}
</BasicBlock>

<style>
</style>
