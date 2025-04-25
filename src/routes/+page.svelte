<script>
	import icoGlyphs from '$lib/index.js';
	import IcoGlyphLinked from '$lib/app/ui/components/IcoGlyphLinked.svelte';
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import HomePageHeader from './HomePageHeader.svelte';
	import Metadata from './Metadata.svelte';
	import { getDefaultHomepageIcons } from '$lib/app/core/utils/homePageData.svelte.js';

	let filteredIcoGlyphs = $state([]);

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
			: getDefaultHomepageIcons();
	};

	filteredIcoGlyphs = getDefaultHomepageIcons();

	// $inspect(getDefaultHomepageIconsWithAliases());
</script>

<Metadata />

<HomePageHeader />

<main>
	<input
		id="searchBar"
		type="text"
		bind:value={appState.searchBarValue}
		placeholder="Type what you wish to express..."
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
		border: var(--border-width-medium) solid var(--b3);
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
