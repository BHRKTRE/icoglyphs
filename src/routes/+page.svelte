<script>
	import IcoGlyphLinked from '$lib/app/components/IcoGlyphLinked.svelte';
	import icoGlyphs from '$lib/index.js';
	import appState from '$lib/app/appState.svelte.js';
	import HomePageHeader from './HomePageHeader.svelte';
	import Metadata from './Metadata.svelte';
	import { searchBarIcoglyphs } from '$lib/app/utils/searchBarIcoglyphs.svelte.js';

	let filteredIcoGlyphs = $state([]);

	const getDefaultHomepageIcons = icoGlyphs.library
		.filter((ig) => ig.is_public)
		.map((ig) => ig.aliases[0])
		.reverse();

	function handleSearch() {
		const query = appState.searchBarValue;
		filteredIcoGlyphs = query.trim() === '' ? getDefaultHomepageIcons : searchBarIcoglyphs(query);
	}

	filteredIcoGlyphs = getDefaultHomepageIcons;

	// $inspect(filteredIcoGlyphs);
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
