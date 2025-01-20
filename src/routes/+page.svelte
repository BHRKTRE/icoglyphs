<script>
	import icoGlyphs from 'icoglyphs';
	import IcoglyphDisplay from './_components/IcoglyphDisplay.svelte';

	let showPrivate = false;

	const allPathKeys = [];

	for (const icoGlyphName in icoGlyphs.library().svgData) {
		if (showPrivate || !icoGlyphName.startsWith('_')) {
			allPathKeys.push(icoGlyphName);
		}
	}

	// $inspect(icoGlyphsNameArray);
</script>

<div id="main">
	{#each allPathKeys as pathKeys}
		<IcoglyphDisplay icoGlyphName={pathKeys} />
	{/each}
</div>

<style>
	#main {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		height: 100%;
		width: 100%;
	}
</style>
