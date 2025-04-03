<script>
	import icoGlyphs from '$lib/index.js';
	import IcoGlyphLinked from '$lib/app/ui/components/IcoGlyphLinked.svelte';
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import Header from './Header.svelte';

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

<svelte:head>
	<meta
		name="description"
		content="icoGlyphs - Icons designed with meaning, breaking cultural barriers for a truly universal visual language."
	/>
	<meta
		name="keywords"
		content="icons, glyphs, universal icons, ideographic, design, API, customizable, SVG, PNG, open-source, free, visual language"
	/>
	<!-- <meta name="author" content="icoGlyphs" /> -->
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content="icoGlyphs - Free Ideographic Icons" />
	<meta
		property="og:description"
		content="Icons designed with meaning, breaking cultural barriers for a truly universal visual language."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://www.icoglyphs.com" />
	<!-- <meta property="og:image" content="https://www.icoglyphs.com/assets/images/og-image.jpg" /> -->
	<meta name="twitter:title" content="icoGlyphs - Free Ideographic Icons" />
	<meta
		name="twitter:description"
		content="Icons designed with meaning, breaking cultural barriers for a truly universal visual language."
	/>
	<!-- <meta name="twitter:image" content="https://www.icoglyphs.com/assets/images/twitter-image.jpg"> -->
	<meta name="twitter:card" content="summary_large_image" />
	<title>icoGlyphs - Free Ideographic Icons</title>
</svelte:head>

<!-- <Header /> -->

<main>
	<input
		id="searchBar"
		type="text"
		bind:value={appState.searchBarValue}
		placeholder="Search icoGlyphs..."
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
		max-width: 770px;
		background: var(--b2);
		padding: var(--spacing-small) var(--spacing-medium);
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
		flex-direction: column;
		align-items: center;

		flex-wrap: wrap;
		height: 100%;
		width: 100%;
	}
</style>
