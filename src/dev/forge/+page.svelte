<script>
	import { dev } from '$app/environment';
	import BasicBlock from '$lib/app/components/BasicBlock.svelte';
	import icoGlyphs from '$lib/icoglyphs.js';
	import appState from '$lib/app/appState.svelte.js';
	import { animate } from 'animejs';
	import { v4 as uuidv4 } from 'uuid';

	if (!dev) {
		throw error(404, 'Not found');
	}

	//--------------------------------

	// var
	let animationTesterArray = $state([]);
	let filteredIcoGlyphs = $state([]);

	let actualStateObj = $state({
		aliases: [],
		path: [],
		categories: [],
		tags: [],
		id: uuidv4(),
		is_public: false
	});

	let newAlias = $state('');
	let newPath = $state('');
	let newCategory = $state('');
	let newTag = $state('');

	let preIgSelected = $state(null);

	let willCreateNewIg = $state(true);

	// CRUD functions
	async function createNewIg() {
		const res = await fetch('/forge', {
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
		const res = await fetch('/forge', {
			method: 'PATCH',
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

	// Search Bar
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

		filteredIcoGlyphs = search(query);
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

	// Top buttons functions

	function resetpreIgSelected() {
		preIgSelected = null;
	}

	function actualiseAnimationTesterArray() {
		let testAr = [];

		icoGlyphs.db.forEach((icon) => {
			if (icon?.categories?.some((category) => preIgSelected?.categories?.includes(category))) {
				testAr.push(icon);
			}
		});

		animationTesterArray = testAr;
		resetpreIgSelected();
	}

	function loadIg() {
		willCreateNewIg = false;

		preIgSelected.aliases = preIgSelected.aliases || [];
		preIgSelected.path = preIgSelected.path || [];
		preIgSelected.categories = preIgSelected.categories || [];
		preIgSelected.tags = preIgSelected.tags || [];
		preIgSelected.is_public =
			typeof preIgSelected.is_public === 'boolean' ? preIgSelected.is_public : false;

		actualStateObj = preIgSelected;

		actualiseAnimationTesterArray();
		resetpreIgSelected();
	}

	function duplicateIg() {
		willCreateNewIg = true;

		const aliases = preIgSelected.aliases || [];
		const path = preIgSelected.path || [];
		const categories = preIgSelected.categories || [];
		const tags = preIgSelected.tags || [];
		const isPublic = typeof preIgSelected.is_public === 'boolean' ? preIgSelected.is_public : false;

		actualStateObj.aliases = aliases;
		actualStateObj.path = path;
		actualStateObj.categories = categories;
		actualStateObj.tags = tags;
		actualStateObj.id = uuidv4();
		actualStateObj.is_public = isPublic;

		actualiseAnimationTesterArray();
		resetpreIgSelected();
	}

	// Increment IG functions
	function pushElToArray(array, el) {
		if (el.trim() !== '') {
			array.push(el);
			el = '';
		}
	}

	function deleteEl(array, index) {
		array.splice(index, 1);
	}

	// Met l'élément à l'index donné avant (vers le début)
	function moveBefore(array, index) {
		if (index <= 0) return; // déjà au début
		const [item] = array.splice(index, 1);
		array.splice(index - 1, 0, item);
	}

	// Met l'élément à l'index donné après (vers la fin)
	function moveAfter(array, index) {
		if (index >= array.length - 1) return; // déjà à la fin
		const [item] = array.splice(index, 1);
		array.splice(index + 1, 0, item);
	}

	//---
	function preIgIsSelected(icoGlyphName) {
		preIgSelected = icoGlyphs.searchIcoGlyph(icoGlyphName);
	}

	function addToAnimationTester() {
		animationTesterArray.push(preIgSelected);
	}

	let aliasesAlreadyUsed = $derived.by(() => {
		const existingAliases = new Set();

		for (const entry of icoGlyphs.db) {
			if (willCreateNewIg || entry.id !== actualStateObj.id) {
				for (const alias of entry.aliases) {
					existingAliases.add(alias);
				}
			}
		}

		return actualStateObj.aliases
			? actualStateObj.aliases.filter((alias) => existingAliases.has(alias))
			: [];
	});

	let pathAlreadyUsed = $derived.by(() => {
		// May add a warning if the path does not start with 'M ...' to avoid duplicates

		if (!actualStateObj.path || actualStateObj.path.length === 0) {
			return false;
		}

		const normalize = (arr) => [...arr].sort();
		const currentPathSorted = normalize(actualStateObj.path);

		for (const entry of icoGlyphs.db) {
			if (!entry.path) continue;

			if (!willCreateNewIg && entry.id === actualStateObj.id) {
				continue;
			}

			const entryPathSorted = normalize(entry.path);

			if (
				currentPathSorted.length === entryPathSorted.length &&
				currentPathSorted.every((val, idx) => val === entryPathSorted[idx])
			) {
				return entry.id;
			}
		}

		return false;
	});

	//---
	$inspect(actualStateObj);
</script>

{#if dev}
	<header>
		<BasicBlock>
			{#snippet el()}
				<div class="buttons-container">
					<button class="button-default header-button" onclick={addToAnimationTester}>
						<span>Add To Animation Test</span>
						<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}> </svg>
					</button>
					<button class="button-default header-button" onclick={loadIg}>
						<span>Load</span>
						<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}> </svg>
					</button>
					<button class="button-default header-button" onclick={duplicateIg}>
						<span>Duplicate</span>
						<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}> </svg>
					</button>
				</div>
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
							onclick={() => preIgIsSelected(icoGlyphName)}
							class="icoglyphContainer button-svg-only {preIgSelected?.aliases[0] === icoGlyphName
								? 'pre-ig-is-selected'
								: ''}"
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
			{#if willCreateNewIg}
				<button class="button-default update-button" onclick={() => createNewIg(actualStateObj)}>
					<span>Create new icoGlyph</span>
					<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}> </svg>
				</button>
			{:else}
				<button class="button-default update-button" onclick={updateIg}>
					<span>Update this one</span>
					<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}> </svg>
				</button>
			{/if}

			<BasicBlock>
				{#snippet title()}
					<h3>Animation Tester</h3>
				{/snippet}
				{#snippet el()}
					<div class="animation-tester-container">
						{#each animationTesterArray as ig}
							<button
								onmouseenter={() => animationOnMouseEnter(ig.aliases[0])}
								onmouseleave={animationOnMouseLeave}
								class="icoglyphContainer button-svg-only"
								style:width="60px"
								style:height="60px"
							>
								<title id="icon-title">{ig.aliases[0]} icon</title>
								<svg
									role="img"
									aria-labelledby="icon-title"
									{...appState.icoGlyphUserSettings.style}
									{...icoGlyphs.getSvgAttributes()}
								>
									<path d={icoGlyphs.getPath(ig.aliases[0])} />
								</svg>
							</button>
						{/each}
					</div>
				{/snippet}
			</BasicBlock>
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
					{#if aliasesAlreadyUsed.length > 0}
						<p class="warning-txt">"{aliasesAlreadyUsed}" are already used</p>
					{/if}
				{/snippet}
				{#snippet el()}
					<div class="array-container">
						{#each actualStateObj.aliases as alias, index}
							<div class="el-container">
								<p>{alias}</p>
								<button class="el-button" onclick={() => deleteEl(actualStateObj.aliases, index)}
									>D</button
								>
								{#if index !== 0}
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button
										class="el-button"
										onclick={() => moveBefore(actualStateObj.aliases, index)}
									>
										<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
											<path d={icoGlyphs.getPath('arrow-up')}></path>
										</svg>
									</button>
								{/if}
								{#if index !== actualStateObj.aliases.length - 1}
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button
										class="el-button"
										onclick={() => moveAfter(actualStateObj.aliases, index)}
									>
										<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
											<path d={icoGlyphs.getPath('arrow-down')}></path>
										</svg>
									</button>
								{/if}
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
								pushElToArray(actualStateObj.path, newPath);
							}
						}}
						bind:value={newPath}
					/>
					{#if pathAlreadyUsed}
						<p class="warning-txt">
							This path is already used in IG with ID: <br />
							{pathAlreadyUsed}
						</p>
					{/if}
				{/snippet}
				{#snippet el()}
					<div class="array-container">
						{#each actualStateObj.path as path, index}
							<div class="el-container">
								<p>{path}</p>
								<button class="el-button" onclick={() => deleteEl(actualStateObj.path, index)}
									>D</button
								>
								{#if index !== 0}
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button class="el-button" onclick={() => moveBefore(actualStateObj.path, index)}>
										<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
											<path d={icoGlyphs.getPath('arrow-up')}></path>
										</svg>
									</button>
								{/if}
								{#if index !== actualStateObj.path.length - 1}
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button class="el-button" onclick={() => moveAfter(actualStateObj.path, index)}>
										<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
											<path d={icoGlyphs.getPath('arrow-down')}></path>
										</svg>
									</button>
								{/if}
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
								pushElToArray(actualStateObj.categories, newCategory);
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
								<button class="el-button" onclick={() => deleteEl(actualStateObj.categories, index)}
									>D</button
								>
								{#if index !== 0}
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button
										class="el-button"
										onclick={() => moveBefore(actualStateObj.categories, index)}
									>
										<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
											<path d={icoGlyphs.getPath('arrow-up')}></path>
										</svg>
									</button>
								{/if}
								{#if index !== actualStateObj.categories.length - 1}
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button
										class="el-button"
										onclick={() => moveAfter(actualStateObj.categories, index)}
									>
										<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
											<path d={icoGlyphs.getPath('arrow-down')}></path>
										</svg>
									</button>
								{/if}
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
								pushElToArray(actualStateObj.tags, newTag);
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
								<button class="el-button" onclick={() => deleteEl(actualStateObj.tags, index)}
									>D</button
								>
								{#if index !== 0}
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button class="el-button" onclick={() => moveBefore(actualStateObj.tags, index)}>
										<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
											<path d={icoGlyphs.getPath('arrow-up')}></path>
										</svg>
									</button>
								{/if}
								{#if index !== actualStateObj.tags.length - 1}
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button class="el-button" onclick={() => moveAfter(actualStateObj.tags, index)}>
										<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
											<path d={icoGlyphs.getPath('arrow-down')}></path>
										</svg>
									</button>
								{/if}
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
	main {
		display: flex;
		height: 100vh;
		width: 100%;
		gap: var(--spacing-medium);
		border-radius: var(--border-radius);
	}

	header {
		width: 100%;
		margin-bottom: var(--spacing-medium);
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

	#searchBar {
		height: 30px;
	}

	#searchBarIcoGlyphsContainer {
		display: flex;
		align-content: flex-start;
		flex-wrap: wrap;
		overflow-y: auto;
		gap: var(--spacing-medium);
		height: 200px;
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

	.el-button {
		display: flex;
		height: 100%;
		max-height: 30px;
	}

	.warning-txt {
		padding: var(--spacing-small) var(--spacing-medium);
		background: var(--b4);
		margin-top: var(--spacing-medium);
		border-radius: var(--border-radius);
	}

	.buttons-container {
		display: flex;
		gap: var(--spacing-medium);
	}

	.animation-tester-container {
		display: flex;
		align-content: flex-start;
		flex-wrap: wrap;
		overflow-y: auto;

		gap: var(--spacing-medium);
	}

	.pre-ig-is-selected {
		border: var(--border-width-medium) solid var(--t1);
	}

	.update-button {
		width: 100%;
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
