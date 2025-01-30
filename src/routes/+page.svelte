<script>
	import icoGlyphs from 'icoglyphs';
	import IcoGlyphLinked from '$lib/components/clickable/IcoGlyphLinked.svelte';
	import globalVar from '$lib/globalVar.svelte.js';

	const allPathKeys = [];

	for (const icoGlyphName in icoGlyphs.library().svgData) {
		const paths = icoGlyphs.library().svgData[icoGlyphName].path;

		allPathKeys.push({ icoGlyphName });
	}

	// $inspect(allPathKeys);
</script>

<main>
	{#each allPathKeys as pathKeys}
		<IcoGlyphLinked icoGlyphName={pathKeys.icoGlyphName} />
	{/each}
</main>
<button onclick={globalVar.showPrivateIcoGlyph.togglePrivateIcoGlyph}
	><h3>Toggle showPrivateIcoGlyph</h3></button
>

<style>
	main {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		height: 100%;
		width: 100%;
	}
</style>
