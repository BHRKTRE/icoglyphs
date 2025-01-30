<script>
	import icoGlyphs from 'icoglyphs';
	import IcoGlyphLinked from '$lib/components/clickable/IcoGlyphLinked.svelte';
	import { page } from '$app/stores';
	import CopySvgButton from '$lib/components/button/CopySvgButton.svelte';
	import DownLoadSvgButton from '$lib/components/button/DownLoadSvgButton.svelte';
	import DownLoadPngButton from '$lib/components/button/DownLoadPngButton.svelte';

	let { data } = $props();

	const allPathKeys = [];

	$inspect(data.metadata);
</script>

<main>
	<div class="icoglyph-container">
		<svg {...icoGlyphs.getSvgAttributes(data.name)}>
			<path d={icoGlyphs.getPath(data.name)} />
		</svg>
	</div>

	<CopySvgButton icoGlyphName={data.name} />
	<DownLoadSvgButton icoGlyphName={data.name} />
	<DownLoadPngButton icoGlyphName={data.name} />

	<div id="subIcoGlyphsDisplay">
		{#each allPathKeys as pathKeys}
			{#if pathKeys !== data.name}
				<IcoGlyphLinked icoGlyphName={pathKeys} />
			{/if}
		{/each}
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.icoglyph-container {
		width: 100%;
		height: 100%;
		border: rgb(141, 116, 116) 1px solid;
		margin: 5px;
		border-radius: 5%;
	}
</style>
