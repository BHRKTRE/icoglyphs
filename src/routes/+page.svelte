<script>
	import IcoGlyphLinked from '$lib/app/components/IcoGlyphLinked.svelte';
	import icoGlyphs from '$lib/icoglyphs.js';
	import appState from '$lib/app/appState.svelte.js';
	import HomePageHeader from './HomePageHeader.svelte';
	import Metadata from './Metadata.svelte';

	let filteredIcoGlyphs = $state([]);

	const getDefaultHomepageIcons = icoGlyphs.db
		.filter((ig) => ig.is_public)
		.map((ig) => ig.aliases[0])
		.reverse();

	function search(query) {
		const lowerQuery = query.trim().toLowerCase();
		if (!lowerQuery) return [];

		const queryWords = lowerQuery.split(/\s+/);
		return icoGlyphs.db
			.filter((item) => {
				const fieldsToSearch = [
					...(item.aliases || []),
					...(item.tags || []),
					...(item.categories || []),
					...(item.id ? [item.id] : [])
				].map((str) => str.toLowerCase());

				return queryWords.some((word) => fieldsToSearch.some((field) => field.includes(word)));
			})
			.map((item) => item.aliases[0]);
	}

	function handleSearch() {
		const query = appState.searchBarValue.trim().toLowerCase();

		filteredIcoGlyphs = query === '' ? getDefaultHomepageIcons : search(query);
	}

	filteredIcoGlyphs = getDefaultHomepageIcons;

	// $inspect(search(appState.searchBarValue));
</script>

<Metadata />

<HomePageHeader />

<main>
	<input
		id="searchBar"
		type="text"
		bind:value={appState.searchBarValue}
		placeholder="Type what you wish to express..."
		oninput={handleSearch}
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
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
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
