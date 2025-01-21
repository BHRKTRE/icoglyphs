<script>
	import icoGlyphs from 'icoglyphs';
	import IcoGlyphLinked from '$lib/components/clickable/IcoGlyphLinked.svelte';
	import { page } from '$app/stores';

	let { data } = $props();

	const allPathKeys = [];

	const subNamePage = $page.params.icoGlyphNamePage;

	for (const icoGlyphName in icoGlyphs.library().svgData[subNamePage].path) {
		allPathKeys.push(icoGlyphName);
	}

	// $inspect(data);
</script>

<main>
	<div class="icoglyph-container">
		<svg {...icoGlyphs.getSvgAttributes(subNamePage)}>
			<path d={icoGlyphs.getPath(subNamePage, data.name)} />
		</svg>
	</div>

	<div id="subIcoGlyphsDisplay">
		{#each allPathKeys as pathKeys}
			<IcoGlyphLinked icoGlyphName={subNamePage} icoGlyphSubName={pathKeys} />
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
