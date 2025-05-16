<script>
	import { dev } from '$app/environment';
	import BasicBlock from '$lib/app/ui/components/BasicBlock.svelte';
	import icoGlyphs from '$lib/index.js';
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import { searchBarIcoglyphs } from '$lib/app/core/utils/searchBarIcoglyphs.svelte.js';
	import MorphingPath from '$lib/app/ui/components/MorphingPath.svelte';
	import anime from 'animejs';
	import { createNewIg, updateIg } from './writeJSON.svelte.js';

	if (!dev) {
		throw error(404, 'Not found');
	}

	let filteredIcoGlyphs = $state([]);

	const startingValue = {
		key: '',
		aliases: null,
		path: 'eye',
		metadata: {
			categories: null,
			tags: null
		}
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

	function handleSearch() {
		const query = appState.searchBarValue;
		filteredIcoGlyphs = query.trim() === '' ? '' : searchBarIcoglyphs(query);
	}

	// Binding functions

	function setNestedValue(obj, path, value) {
		const keys = path.split('.');
		let current = obj;
		for (let i = 0; i < keys.length - 1; i++) {
			if (!current[keys[i]]) current[keys[i]] = {};
			current = current[keys[i]];
		}
		current[keys[keys.length - 1]] = value;
	}
	function updateSetterValue(v, path) {
		setNestedValue(actualStateObj, path, JSON.parse(v));
	}

	// Main iG animation
	const animeDuration = 1000;
	function animationOnMouseEnter(d) {
		anime({
			targets: '#main-svg-preview',
			d: icoGlyphs.getPath(d),
			duration: animeDuration,
			easing: 'easeInOutQuad'
		});
	}
	function animationOnMouseLeave() {
		anime({
			targets: '#main-svg-preview',
			d: icoGlyphs.getPath(actualStateObj.path),
			duration: animeDuration,
			easing: 'easeInOutQuad'
		});
	}

	function loadIg(igName) {
		const result = icoGlyphs.searchIcoGlyph(igName);
		if (!result) return;

		const { key, aliases = null, path, metadata = {} } = result;
		const { categories = null, tags = null } = metadata;

		const updateState = (stateObj) => {
			stateObj.key = key;
			stateObj.aliases = aliases;
			stateObj.path = path;
			stateObj.metadata.categories = categories;
			stateObj.metadata.tags = tags;
		};

		updateState(actualStateObj);
		updateState(originalStateObj);
	}

	// $inspect();
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
			<button class="button-default update-button" onclick={createNewIg}>
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
					<h3>Key</h3>
				{/snippet}
				{#snippet el()}
					<textarea
						id="input-key"
						bind:value={() => JSON.stringify(actualStateObj.key, null, 2),
						(v) => updateSetterValue(v, 'key')}
					></textarea>
				{/snippet}
			</BasicBlock>

			<BasicBlock>
				{#snippet title()}
					<h3>Aliases</h3>
				{/snippet}
				{#snippet el()}
					<textarea
						id="input-aliases"
						bind:value={() => JSON.stringify(actualStateObj.aliases, null, 2),
						(v) => updateSetterValue(v, 'aliases')}
					></textarea>
				{/snippet}
			</BasicBlock>

			<BasicBlock>
				{#snippet title()}
					<h3>Path</h3>
				{/snippet}
				{#snippet el()}
					<textarea
						id="input-path"
						bind:value={() => JSON.stringify(actualStateObj.path, null, 2),
						(v) => updateSetterValue(v, 'path')}
					></textarea>
				{/snippet}
			</BasicBlock>

			<BasicBlock>
				{#snippet title()}
					<h3>Metadata</h3>
				{/snippet}
				{#snippet el()}
					<BasicBlock>
						{#snippet title()}
							<h3>Categories</h3>
						{/snippet}
						{#snippet el()}
							<textarea
								id="input-categories"
								bind:value={() => JSON.stringify(actualStateObj.metadata.categories, null, 2),
								(v) => updateSetterValue(v, 'metadata.categories')}
							></textarea>
						{/snippet}
					</BasicBlock>
					<BasicBlock>
						{#snippet title()}
							<h3>Tags</h3>
						{/snippet}
						{#snippet el()}
							<textarea
								id="input-tags"
								bind:value={() => JSON.stringify(actualStateObj.metadata.tags, null, 2),
								(v) => updateSetterValue(v, 'metadata.tags')}
							></textarea>
						{/snippet}
					</BasicBlock>
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
