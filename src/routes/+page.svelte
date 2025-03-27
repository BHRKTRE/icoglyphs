<script>
	import icoGlyphs from '$lib/index.js';
	import IcoGlyphLinked from '$lib/app/ui/components/IcoGlyphLinked.svelte';
	import appState from '$lib/app/core/stores/appState.svelte.js';

	let filteredIcoGlyphs = $state([]);

	// Function to shuffle an array (Fisher-Yates algorithm)
	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	const getDefaultIcoGlyphs = () => {
		const categoriesUsed = new Map();

		const defaultIcons = Object.keys(icoGlyphs.library().svgData).filter((icoGlyphName) => {
			const icoData = icoGlyphs.library().svgData[icoGlyphName];
			const aliases = icoData.aliases || [];
			if (aliases.length === 0) return false;

			const { metadata } = icoData;

			if (metadata?.categories) {
				return metadata.categories.some((cat) => {
					if (!categoriesUsed.has(cat)) {
						categoriesUsed.set(cat, []);
					}
					categoriesUsed.get(cat).push(icoGlyphName);
					return false;
				});
			}

			return !metadata?.categories;
		});

		categoriesUsed.forEach((icons, cat) => {
			const randomIcon = icons[Math.floor(Math.random() * icons.length)];
			defaultIcons.push(randomIcon);
		});

		return shuffleArray(defaultIcons);
	};

	const search = () => {
		const lowerQuery = appState.searchBarValue.trim().toLowerCase();
		const queryWords = lowerQuery.split(/\s+/);

		filteredIcoGlyphs = lowerQuery
			? Object.keys(icoGlyphs.library().svgData).filter((icoGlyphName) => {
					const icoData = icoGlyphs.library().svgData[icoGlyphName];
					const { metadata } = icoData;
					const aliases = (icoData.aliases || []).map((alias) => alias.toLowerCase());
					const iconText = icoGlyphName.toLowerCase();
					const iconTags = (metadata?.tags ?? []).map((tag) => tag.toLowerCase());
					const iconCategories = (metadata?.categories ?? []).map((cat) => cat.toLowerCase());

					// Filter icons by name, aliases, tags, and categories
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

	// Randomize icons when the page loads
	filteredIcoGlyphs = getDefaultIcoGlyphs();
</script>

<main>
	<input
		id="searchBar"
		type="text"
		bind:value={appState.searchBarValue}
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
