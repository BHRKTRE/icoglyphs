<script>
	import icoGlyphs from 'icoglyphs';
	import IcoGlyphLinked from '$lib/components/clickable/IcoGlyphLinked.svelte';
	import globalVar from '$lib/globalVar.svelte.js';

	const allPathKeys = [];

	// Display all the icoGlyphs for each category or if no category is defined
	const categoriesUsed = new Set();

	for (const icoGlyphName in icoGlyphs.library().svgData) {
		const icoGlyphData = icoGlyphs.library().svgData[icoGlyphName];
		const categories = icoGlyphData.metadata?.categories;

		if (categories) {
			if (categories.some((category) => !categoriesUsed.has(category))) {
				categories.forEach((category) => categoriesUsed.add(category));
				allPathKeys.push({ icoGlyphName });
			}
		} else {
			allPathKeys.push({ icoGlyphName });
		}
	}

	// $inspect(categoriesUsed);
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
