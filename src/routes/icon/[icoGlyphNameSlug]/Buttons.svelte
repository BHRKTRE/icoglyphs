<script>
	import BasicBlock from '$lib/app/ui/components/BasicBlock.svelte';
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import MorphingPath from '$lib/app/ui/components/MorphingPath.svelte';
	import icoGlyphs from '$lib/index.js';
	import {
		downloadPng,
		copySvgToClipBoard,
		downloadSvg
	} from '$lib/app/core/utils/export-tools.svelte.js';

	let { data } = $props();

	// $inspect(data);
</script>

<BasicBlock>
	{#snippet el()}
		<button class="button-default" onclick={() => downloadPng(data.name)}>
			<span>Download icon's PNG</span>
			<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
				<MorphingPath IGName={'download'} />
			</svg>
		</button>

		<button class="button-default" onclick={() => downloadSvg(data.name)}>
			<span>Download icon's SVG</span>
			<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
				<MorphingPath IGName={'download'} />
			</svg>
		</button>

		<button class="button-default" onclick={() => copySvgToClipBoard(data.name)}>
			<span>Copy SVG to clipboard</span>
			<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
				<MorphingPath IGName={'copy'} />
			</svg>
		</button>
	{/snippet}
</BasicBlock>

<style>
	#top-container {
		width: 100%;
		height: 100%;
		max-width: var(--max-width-medium);
		position: relative;
		display: flex;
		flex-direction: column;
	}

	button {
		width: 100%;
	}
</style>
