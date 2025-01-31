<script>
	import icoGlyphs from 'icoglyphs';
	import IcoGlyphLinked from '$lib/components/clickable/IcoGlyphLinked.svelte';
	import globalVar from '$lib/globalVar.svelte.js';

	let query = $state('');
	let filteredIcoGlyphs = $state([]);

	const getDefaultIcoGlyphs = () => {
		const categoriesUsed = new Set();
		return Object.keys(icoGlyphs.library().svgData).filter((icoGlyphName) => {
			if (!globalVar.showPrivateIcoGlyph.value && icoGlyphName.startsWith('_')) return false;

			const { metadata } = icoGlyphs.library().svgData[icoGlyphName];
			if (metadata?.categories?.some((cat) => !categoriesUsed.has(cat))) {
				metadata.categories.forEach((cat) => categoriesUsed.add(cat));
				return true;
			}
			return !metadata?.categories;
		});
	};

	const search = () => {
		const lowerQuery = query.trim().toLowerCase();
		const queryWords = lowerQuery.split(/\s+/); // Découpe en mots

		filteredIcoGlyphs = lowerQuery
			? Object.keys(icoGlyphs.library().svgData).filter((icoGlyphName) => {
					if (!globalVar.showPrivateIcoGlyph.value && icoGlyphName.startsWith('_')) return false;

					const { metadata } = icoGlyphs.library().svgData[icoGlyphName];
					const iconText = icoGlyphName.toLowerCase();
					const iconTags = (metadata?.tags ?? []).map((tag) => tag.toLowerCase());

					// Vérifie que TOUS les mots sont présents dans le nom ou les tags
					return queryWords.every(
						(word) => iconText.includes(word) || iconTags.some((tag) => tag.includes(word))
					);
				})
			: getDefaultIcoGlyphs();
	};

	filteredIcoGlyphs = getDefaultIcoGlyphs();
</script>

<main>
	<input
		id="searchBar"
		type="text"
		bind:value={query}
		placeholder="Search icoGlyphs"
		oninput={search}
	/>

	<button
		onclick={() => {
			globalVar.showPrivateIcoGlyph.togglePrivateIcoGlyph();
			search();
		}}
	>
		<h3>Toggle showPrivateIcoGlyph</h3>
	</button>

	<div id="icoGlyphsContainer">
		{#each filteredIcoGlyphs as icoGlyphName}
			<IcoGlyphLinked {icoGlyphName} />
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
