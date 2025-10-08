<script>
	import BasicBlock from '$lib/app/components/BasicBlock.svelte';
	import icoGlyphs from '$lib/icoglyphs.js';
	import MorphingPath from '$lib/app/components/MorphingPath.svelte';
	import appState from '$lib/app/appState.svelte.js';

	let { data } = $props();

	function translateBooleanToIg(value) {
		return value ? 'true' : 'false';
	}

	function translateBooleanToString(value) {
		return value ? 'On' : 'Off';
	}

	$effect(() => {
		const userSettings = Object.fromEntries(
			Object.entries(appState.userSettings).map(([key, data]) => [key, data])
		);
		localStorage.setItem('userSettings', JSON.stringify(userSettings));
	});

	// $inspect(appState.userSettings.useStyleForExportSvg);
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
						(appState.userSettings.useStyleForExportSvg =
							!appState.userSettings.useStyleForExportSvg)}
				>
					<span>{translateBooleanToString(appState.userSettings.useStyleForExportSvg)}</span>
					<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
						<MorphingPath
							IGName={translateBooleanToIg(appState.userSettings.useStyleForExportSvg)}
						/>
					</svg>
				</button>
			{/snippet}
		</BasicBlock>
	{/snippet}
</BasicBlock>

<style>
</style>
