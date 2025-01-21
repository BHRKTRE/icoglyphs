<script>
	import icoGlyphs from 'icoglyphs';
	import IcoGlyphLinked from '../lib/components/clickable/IcoGlyphLinked.svelte';
	import globalVar from '../lib/globalVar.svelte.js';

	let showPrivate = false;

	const allPathKeys = [];

	for (const icoGlyphName in icoGlyphs.library().svgData) {
		allPathKeys.push(icoGlyphName);
	}

	// $inspect(globalVar);
</script>

<div id="main">
	{#each allPathKeys as pathKeys}
		<IcoGlyphLinked icoGlyphName={pathKeys} />
	{/each}
</div>
<button onclick={globalVar.showPrivateIcoGlyph.togglePrivateIcoGlyph}
	><h3>Toggle showPrivateIcoGlyph</h3></button
>

<style>
	#main {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		height: 100%;
		width: 100%;
	}
</style>
