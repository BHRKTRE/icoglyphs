<script>
	import { dev } from '$app/environment';
	import BasicBlock from '$lib/app/ui/components/BasicBlock.svelte';
	import icoGlyphs from '$lib/index.js';
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import { searchBarIcoglyphs } from '$lib/app/core/utils/searchBarIcoglyphs.svelte.js';

	let filteredIcoGlyphs = $state([]);

	function handleSearch() {
		const query = appState.searchBarValue;
		filteredIcoGlyphs = query.trim() === '' ? '' : searchBarIcoglyphs(query);
	}

	if (!dev) {
		throw error(404, 'Not found');
	}

	let objj = $state({
		key: 'eeeee',
		aliases: ['alss'],
		path: 'M -35 0 Q 0 -30 35 0 Q 0 30 -35 0 Z M 0 -10 A 1 1 0 0 0 0 10 A 1 1 0 0 0 0 -10 M -20 22 L -25 30 M 0 25 L 0 35 M 20 22 L 25 30',
		metadata: {
			categories: ['Toggle'],
			tags: [
				'deactivated',
				'disabled',
				'cancel',
				'false',
				'inactive',
				'state',
				'unchecked',
				'unselected',
				'stopped'
			]
		}
	});

	function updateTextareaArray(e, setValue) {
		try {
			const parsed = JSON.parse(e.target.value);
			if (Array.isArray(parsed)) {
				setValue(parsed);
			}
		} catch (err) {
			console.error('JSON invalide');
		}
	}

	function loadIg(igName) {
		// console.log(icoGlyphs.searchIcoGlyph(igName).categories);
		const result = icoGlyphs.searchIcoGlyph(igName);
		if (!result) return;

		objj.key = result.key;
		objj.aliases = result.aliases ?? null;
		objj.path = result.path;

		objj.metadata.categories = result.metadata?.categories ?? null;
		objj.metadata.tags = result.metadata?.tags ?? null;
	}

	$inspect(objj.key);
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
				{#snippet el()}
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
										d={icoGlyphs.getPath(objj.path)}
									></path>
								</svg>
							</div>
						{/snippet}
					</BasicBlock>
				{/snippet}
			</BasicBlock>
		</div>
		<div id="right-part">
			<BasicBlock>
				{#snippet el()}
					<BasicBlock>
						{#snippet title()}
							<h3>Key</h3>
						{/snippet}
						{#snippet el()}
							<textarea id="input-key" bind:value={objj.key}></textarea>
						{/snippet}
					</BasicBlock>
				{/snippet}
			</BasicBlock>
			<BasicBlock>
				{#snippet el()}
					<BasicBlock>
						{#snippet title()}
							<h3>Aliases</h3>
						{/snippet}
						{#snippet el()}
							<textarea
								id="input-aliases"
								oninput={(e) => updateTextareaArray(e, (v) => (objj.categories = v))}
								>{JSON.stringify(objj.aliases, null, 2)}</textarea
							>
						{/snippet}
					</BasicBlock>
				{/snippet}
			</BasicBlock>
			<BasicBlock>
				{#snippet el()}
					<BasicBlock>
						{#snippet title()}
							<h3>Path</h3>
						{/snippet}
						{#snippet el()}
							<textarea
								id="input-path"
								oninput={(e) => updateTextareaArray(e, (v) => (objj.path = v))}
								>{JSON.stringify(objj.path, null, 2)}</textarea
							>
						{/snippet}
					</BasicBlock>
				{/snippet}
			</BasicBlock>
			<BasicBlock>
				{#snippet el()}
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
										oninput={(e) => updateTextareaArray(e, (v) => (objj.metadata.categories = v))}
										>{JSON.stringify(objj.metadata.categories, null, 2)}</textarea
									>
								{/snippet}
							</BasicBlock>
							<BasicBlock>
								{#snippet title()}
									<h3>Tags</h3>
								{/snippet}
								{#snippet el()}
									<textarea
										id="input-tags"
										oninput={(e) => updateTextareaArray(e, (v) => (objj.metadata.tags = v))}
										>{JSON.stringify(objj.metadata.tags, null, 2)}</textarea
									>
								{/snippet}
							</BasicBlock>
						{/snippet}
					</BasicBlock>
				{/snippet}
			</BasicBlock>
		</div>
	</main>
{/if}

<style>
	textarea {
		resize: vertical;
		padding: var(--spacing-medium);
		height: 40px;
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
		height: 60px;

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
