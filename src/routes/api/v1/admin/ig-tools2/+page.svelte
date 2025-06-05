<script>
	import { dev } from '$app/environment';
	import BasicBlock from '$lib/app/components/BasicBlock.svelte';
	import icoGlyphs from '$lib/index.js';
	import appState from '$lib/app/appState.svelte.js';
	import MorphingPath from '$lib/app/components/MorphingPath.svelte';
	import { animate } from 'animejs';
	import { v4 as uuidv4 } from 'uuid';

	//--------------------------------

	let updatedIg = {
		aliases: ['b', 'c', 'd'],
		tags: ['cap', 'foo', 'bar'],
		id: '569ff752-cc21-420e-a26a-f51a1ca525af'
	};

	//--------------------------------

	async function createNewIg() {
		// Create new id for the new icoglyph
		actualStateObj.id = uuidv4();

		// Need to fix it
		actualStateObj.is_public = false;

		const res = await fetch('/api/v1/admin/ig-tools2', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(actualStateObj)
		});

		const data = await res.json();

		if (res.ok) {
			console.log(':)', data);
		} else {
			console.error(':(', data.error);
		}
	}

	async function updateIg() {
		const res = await fetch('/api/v1/admin/ig-tools2', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedIg)
		});

		const data = await res.json();

		if (res.ok) {
			console.log(':)', data);
		} else {
			console.error(':(', data.error);
		}
	}

	//--------------------------------

	if (!dev) {
		throw error(404, 'Not found');
	}

	let filteredIcoGlyphs = $state([]);

	const startingValue = {
		aliases: ['al1', 'al2'],
		path: ['eye'],
		categories: ['cat1', 'cat2', 'cat3'],
		tags: ['tag1', 'tag2'],
		id: '7d09ab6d-5bc1-4c3b-926d-06d6594a95ad',
		is_public: false
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

	let newAlias = $state('');
	let newPath = $state('');
	let newCategory = $state('');
	let newTag = $state('');

	function pushElToArray(array, el) {
		if (el.trim() !== '') {
			array.push(el);
			el = '';
		}
	}

	function deleteEl(array, index) {
		array.splice(index, 1);
	}

	$inspect(actualStateObj);
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
			<button class="button-default update-button" onclick={() => createNewIg(actualStateObj)}>
				<span>Create new icoGlyph</span>
				<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}> </svg>
			</button>
			<!-- {#if changeDetected} -->
			<button class="button-default update-button" onclick={updateIg}>
				<span>Update this one</span>
				<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}> </svg>
			</button>
			<!-- {/if} -->
		</div>

		<div id="right-part">
			<BasicBlock>
				{#snippet title()}
					<h3>Aliases</h3>
				{/snippet}
				{#snippet text()}
					<input
						type="text"
						onkeydown={(event) => {
							if (event.key === 'Enter') {
								pushElToArray(actualStateObj.aliases, newAlias);
							}
						}}
						bind:value={newAlias}
					/>
				{/snippet}
				{#snippet el()}
					<div class="array-container">
						{#each actualStateObj.aliases as alias, index}
							<div class="el-container">
								<p>{alias}</p>
								<button onclick={() => deleteEl(actualStateObj.aliases, index)}>D</button>
							</div>
						{/each}
					</div>
				{/snippet}
			</BasicBlock>

			<BasicBlock>
				{#snippet title()}
					<h3>Path</h3>
				{/snippet}
				{#snippet text()}
					<input
						type="text"
						onkeydown={(event) => {
							if (event.key === 'Enter') {
								pushElToArray(actualStateObj.path, newAlias);
							}
						}}
						bind:value={newPath}
					/>
				{/snippet}
				{#snippet el()}
					<div class="array-container">
						{#each actualStateObj.path as path, index}
							<div class="el-container">
								<p>{path}</p>
								<button onclick={() => deleteEl(actualStateObj.path, index)}>D</button>
							</div>
						{/each}
					</div>
				{/snippet}
			</BasicBlock>

			<BasicBlock>
				{#snippet title()}
					<h3>Categories</h3>
				{/snippet}
				{#snippet text()}
					<input
						type="text"
						onkeydown={(event) => {
							if (event.key === 'Enter') {
								pushElToArray(actualStateObj.categories, newAlias);
							}
						}}
						bind:value={newCategory}
					/>
				{/snippet}
				{#snippet el()}
					<div class="array-container">
						{#each actualStateObj.categories as category, index}
							<div class="el-container">
								<p>{category}</p>
								<button onclick={() => deleteEl(actualStateObj.categories, index)}>D</button>
							</div>
						{/each}
					</div>
				{/snippet}
			</BasicBlock>
			<BasicBlock>
				{#snippet title()}
					<h3>Tags</h3>
				{/snippet}
				{#snippet text()}
					<input
						type="text"
						onkeydown={(event) => {
							if (event.key === 'Enter') {
								pushElToArray(actualStateObj.tags, newAlias);
							}
						}}
						bind:value={newTag}
					/>
				{/snippet}
				{#snippet el()}
					<div class="array-container">
						{#each actualStateObj.tags as tag, index}
							<div class="el-container">
								<p>{tag}</p>
								<button onclick={() => deleteEl(actualStateObj.tags, index)}>D</button>
							</div>
						{/each}
					</div>
				{/snippet}
			</BasicBlock>
			<BasicBlock>
				{#snippet title()}
					<label>
						is_public
						<input type="checkbox" bind:checked={actualStateObj.is_public} />
					</label>
				{/snippet}
			</BasicBlock>
			<BasicBlock>
				{#snippet title()}
					<h3>id</h3>
				{/snippet}
				{#snippet el()}
					<p>{actualStateObj.id}</p>
				{/snippet}
			</BasicBlock>
		</div>
	</main>
{/if}

<style>
	.update-button {
		width: 100%;
	}

	.array-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		gap: var(--spacing-medium);
	}

	.el-container {
		display: flex;
		gap: var(--spacing-medium);
		align-items: center;
		background: var(--b2);
		padding: var(--spacing-small) var(--spacing-medium);
		border-radius: var(--border-radius);
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

	input[type='text'] {
		width: 100%;
		max-width: 770px;
		background: var(--b2);
		padding: var(--spacing-small) var(--spacing-medium);
		border-radius: var(--border-radius);
		border: var(--border-width-medium) solid var(--b3);
	}
	input[type='text']::placeholder {
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
