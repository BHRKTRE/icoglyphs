<script>
	import { dev } from '$app/environment';
	import BasicBlock from '$lib/app/ui/components/BasicBlock.svelte';
	import icoGlyphs from '$lib/index.js';
	import appState from '$lib/app/core/stores/appState.svelte.js';

	if (!dev) {
		throw error(404, 'Not found');
	}

	let objj = $state({
		igName: 'eeeee',
		aliases: 'alss',
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

	function updateArray(e, elName) {
		try {
			const parsed = JSON.parse(e.target.value);
			if (Array.isArray(parsed)) {
				objj.metadata[elName] = parsed;
			}
		} catch (err) {
			console.error('JSON invalide');
		}
	}

	// $inspect(objj.metadata.tags);
</script>

{#if dev}
	<header>
		<BasicBlock>
			{#snippet el()}{/snippet}
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
									><title id="icon-title">dark-mode icon</title><path d={objj.path}></path>
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
							<h3>igName</h3>
						{/snippet}
						{#snippet el()}
							<textarea id="input-igName" bind:value={objj.igName}></textarea>
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
							<textarea id="input-aliases" bind:value={objj.aliases}></textarea>
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
							<textarea id="input-path" bind:value={objj.path}></textarea>
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
									<textarea id="input-categories" oninput={(e) => updateArray(e, 'categories')}
										>{JSON.stringify(objj.metadata.categories, null, 2)}</textarea
									>
								{/snippet}
							</BasicBlock>
							<BasicBlock>
								{#snippet title()}
									<h3>Tags</h3>
								{/snippet}
								{#snippet el()}
									<textarea id="input-tags" oninput={(e) => updateArray(e, 'tags')}
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
