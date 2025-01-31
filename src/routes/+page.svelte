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

	// SearchBar
	let query = '';

	const search = () => {
		console.log('Recherche pour :', query);
		// Ajoutez ici la logique pour gérer la recherche
	};

	// $inspect(categoriesUsed);
</script>

<main>
	<input
		id="searchBar"
		type="text"
		bind:value={query}
		placeholder="Rechercher..."
		oninput={search}
	/>
	<button onclick={globalVar.showPrivateIcoGlyph.togglePrivateIcoGlyph}
		><h3>Toggle showPrivateIcoGlyph</h3></button
	>
	<div id="icoGlyphsContainer">
		{#each allPathKeys as pathKeys}
			<IcoGlyphLinked icoGlyphName={pathKeys.icoGlyphName} />
		{/each}
	</div>
</main>

<style>
	#searchBar {
		width: 100%;
		background: var(--b2);
		padding: 5px 10px;
		border-radius: var(--br);
	}

	#icoGlyphsContainer {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		height: 100%;
		width: 100%;
	}

	main {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		height: 100%;
		width: 100%;
	}
</style>
