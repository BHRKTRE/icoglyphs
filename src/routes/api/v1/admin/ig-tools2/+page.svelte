<script>
	import { dev } from '$app/environment';
	import BasicBlock from '$lib/app/components/BasicBlock.svelte';
	import icoGlyphs from '$lib/index.js';
	import appState from '$lib/app/appState.svelte.js';
	// import { searchBarIcoglyphs } from '$lib/app/utils/searchBarIcoglyphs.svelte.js';
	import MorphingPath from '$lib/app/components/MorphingPath.svelte';
	import { animate } from 'animejs';
	import { json } from '@sveltejs/kit';

	// import { createNewIg } from '$lib/library/newIg.js';

	let msg = { txt: 'abc', array: [1, 2, 3] };

	async function createNewIg(msg) {
		const res = await fetch('/ig-tools2', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(msg)
		});
		const data = await res.json();
		console.log('Ajouté:', data);
	}

	function updateIg() {
		console.log('update');
	}

	//--------------------------------

	if (!dev) {
		throw error(404, 'Not found');
	}

	let filteredIcoGlyphs = $state([]);

	const startingValue = {
		aliases: [],
		path: ['eye'],

		categories: [],
		tags: []
	};

	let actualStateObj = $state(startingValue);

	let originalStateObj = $state(startingValue);

	let actualStateJson = $derived(JSON.stringify(actualStateObj));
	let originalStateJson = $derived(JSON.stringify(originalStateObj));

	let changeDetected = $derived.by(() => {
		if (actualStateJson == originalStateJson) {
			return false;
		} else {
			return true;
		}
	});

	// to rework until sesearchBarIcoglyphs don't exist anymore
	function handleSearch() {
		// 	const query = appState.searchBarValue;
		// 	filteredIcoGlyphs = query.trim() === '' ? '' : searchBarIcoglyphs(query);
	}

	// Main iG animation
	const animeDuration = 1000;
	function animationOnMouseEnter(d) {
		animate('#main-svg-preview', {
			d: icoGlyphs.getPath(d),
			duration: animeDuration,
			ease: 'easeInOutQuad'
		});
	}
	function animationOnMouseLeave() {
		animate('#main-svg-preview', {
			d: icoGlyphs.getPath(actualStateObj.path),
			duration: animeDuration,
			ease: 'easeInOutQuad'
		});
	}

	function loadIg(igName) {
		const result = icoGlyphs.searchIcoGlyph(igName);
		if (!result) return;

		const { key, aliases = null, path, categories = null, tags = null } = result;

		const updateState = (stateObj) => {
			stateObj.key = key;
			stateObj.aliases = aliases;
			stateObj.path = path;
			stateObj.categories = categories;
			stateObj.tags = tags;
		};

		updateState(actualStateObj);
		updateState(originalStateObj);
	}

	// $inspect(actualStateObj);
</script>

{#if dev}
	<header>
		<BasicBlock>
			{#snippet el()}
				<input
					id="searchBar"
					autocomplete="off"
					type="text"
					bind:value={appState.searchBarValue}
					placeholder="Search"
					oninput={handleSearch}
				/>
				<div id="searchBarIcoGlyphsContainer">
					{#each filteredIcoGlyphs as icoGlyphName}
						<button
							onmouseenter={() => animationOnMouseEnter(icoGlyphName)}
							onmouseleave={animationOnMouseLeave}
							onclick={() => loadIg(icoGlyphName)}
							class="icoglyphContainer button-svg-only"
							style:width="60px"
							style:height="60px"
						>
							<title id="icon-title">{icoGlyphName} icon</title>
							<svg
								role="img"
								aria-labelledby="icon-title"
								{...appState.icoGlyphUserSettings.style}
								{...icoGlyphs.getSvgAttributes()}
							>
								<path d={icoGlyphs.getPath(icoGlyphName)} />
							</svg>
						</button>
					{/each}
				</div>{/snippet}
		</BasicBlock>
	</header>

	<main>
		<div id="left-part">
			<BasicBlock>
				{#snippet title()}
					<h3>SVG Preview</h3>
				{/snippet}
				{#snippet el()}
					<div id="svg-preview-container">
						<svg
							id="svg-preview-el"
							{...appState.icoGlyphUserSettings.style}
							{...icoGlyphs.getSvgAttributes()}
							><title id="icon-title">dark-mode icon</title><path
								id="main-svg-preview"
								d={icoGlyphs.getPath(actualStateObj.path)}
							></path>
						</svg>
					</div>
				{/snippet}
			</BasicBlock>
			<button class="button-default update-button" onclick={() => createNewIg(msg)}>
				<span>Create new icoGlyph</span>
				<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}> </svg>
			</button>
			{#if changeDetected}
				<button class="button-default update-button" onclick={updateIg}>
					<span>Update this one</span>
					<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}> </svg>
				</button>
			{/if}
		</div>

		<div id="right-part">
			<BasicBlock>
				{#snippet title()}
					<h3>Aliases</h3>
				{/snippet}
				{#snippet el()}
					<textarea id="input-aliases" bind:value={actualStateObj.aliases}></textarea>
				{/snippet}
			</BasicBlock>

			<BasicBlock>
				{#snippet title()}
					<h3>Path</h3>
				{/snippet}
				{#snippet el()}
					<textarea id="input-path" bind:value={actualStateObj.path}></textarea>
				{/snippet}
			</BasicBlock>

			<BasicBlock>
				{#snippet title()}
					<h3>Categories</h3>
				{/snippet}
				{#snippet el()}
					<textarea id="input-categories" bind:value={actualStateObj.categories}></textarea>
				{/snippet}
			</BasicBlock>
			<BasicBlock>
				{#snippet title()}
					<h3>Tags</h3>
				{/snippet}
				{#snippet el()}
					<textarea id="input-tags" bind:value={actualStateObj.tags}></textarea>
				{/snippet}
			</BasicBlock>
		</div>
	</main>
{/if}

<style>
	.update-button {
		width: 100%;
	}

	textarea {
		resize: vertical;
		padding: var(--spacing-medium);
		height: 100px;
		width: 100%;
		background: var(--b2) !important;
		color: var(--t1);
	}
	header {
		width: 100%;
		margin-bottom: var(--spacing-medium);
	}
	main {
		display: flex;
		height: 100vh;
		width: 100%;
		gap: var(--spacing-medium);
		border-radius: var(--border-radius);
	}

	#searchBar {
		width: 100%;
		max-width: 770px;
		background: var(--b2);
		padding: var(--spacing-small) var(--spacing-medium);
		border-radius: var(--border-radius);
		border: var(--border-width-medium) solid var(--b3);
	}
	#searchBar::placeholder {
		color: var(--t1);
		opacity: 0.5;
	}

	#searchBarIcoGlyphsContainer {
		display: flex;
		flex-wrap: wrap;
		overflow-y: auto;
		height: 120px;

		gap: var(--spacing-medium);
	}

	#left-part {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		gap: var(--spacing-medium);
	}
	#right-part {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		gap: var(--spacing-medium);
	}

	#svg-preview-container {
		height: 100%;
		width: 100%;
		background: var(--b2);
	}

	#svg-preview-el {
		height: 100%;
		width: 100%;
	}
</style>
