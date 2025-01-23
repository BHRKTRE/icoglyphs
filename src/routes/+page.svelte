<script>
	import icoGlyphs from 'icoglyphs';
	import IcoGlyphLinked from '$lib/components/clickable/IcoGlyphLinked.svelte';
	import globalVar from '$lib/globalVar.svelte.js';

	const allPathKeys = [];

	for (const icoGlyphCat in icoGlyphs.library().svgData) {
		const paths = icoGlyphs.library().svgData[icoGlyphCat].path;

		const firstPathKey = Object.keys(paths)[0];

		allPathKeys.push({ icoGlyphCat, icoGlyphName: firstPathKey });
	}

	// $inspect(allPathKeys);
</script>

<main>
	{#each allPathKeys as pathKeys}
		<IcoGlyphLinked icoGlyphCat={pathKeys.icoGlyphCat} icoGlyphName={pathKeys.icoGlyphName} />
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
