<script>
	import icoGlyphs from '$lib/index.js';
	import IcoGlyphLinked from '$lib/app/ui/components/IcoGlyphLinked.svelte';
	import appState from '$lib/app/core/stores/appState.svelte.js';

	let query = $state('');
	let filteredIcoGlyphs = $state([]);

	const getDefaultIcoGlyphs = () => {
		const categoriesUsed = new Set();
		return Object.keys(icoGlyphs.library().svgData).filter((icoGlyphName) => {
			// Check if the icon is private (it has no aliases) and showPrivateIcoGlyph.value is false
			const icoData = icoGlyphs.library().svgData[icoGlyphName];
			const aliases = icoData.aliases || [];

			// If the icon has no aliases and showPrivateIcoGlyph.value is false, exclude it
			if (!appState.modes.showPrivateIcoGlyph.value && aliases.length === 0) return false;

			const { metadata } = icoData;

			// Include icons from unused categories
			if (metadata?.categories?.some((cat) => !categoriesUsed.has(cat))) {
				metadata.categories.forEach((cat) => categoriesUsed.add(cat));
				return true;
			}

			// Include the icon if it has no categories
			return !metadata?.categories;
		});
	};

	const search = () => {
		const lowerQuery = query.trim().toLowerCase();
		const queryWords = lowerQuery.split(/\s+/);

		filteredIcoGlyphs = lowerQuery
			? Object.keys(icoGlyphs.library().svgData).filter((icoGlyphName) => {
					// Retrieve the icon data
					const icoData = icoGlyphs.library().svgData[icoGlyphName];
					const { metadata } = icoData;
					const aliases = (icoData.aliases || []).map((alias) => alias.toLowerCase());
					const iconText = icoGlyphName.toLowerCase();
					const iconTags = (metadata?.tags ?? []).map((tag) => tag.toLowerCase());
					const iconCategories = (metadata?.categories ?? []).map((cat) => cat.toLowerCase());

					// Filter by icon text, aliases, tags, and categories
					return queryWords.every(
						(word) =>
							iconText.includes(word) ||
							aliases.some((alias) => alias.includes(word)) ||
							iconTags.some((tag) => tag.includes(word)) ||
							iconCategories.some((category) => category.includes(word))
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
		border-radius: var(--border-radius);
		margin-bottom: 1rem;
	}
	#searchBar::placeholder {
		color: var(--t1);
		opacity: 0.5;
	}

	#icoGlyphsContainer {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		height: 100%;
		width: 100%;
		gap: var(--spacing-medium);
	}

	main {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		height: 100%;
		width: 100%;
	}
</style>
