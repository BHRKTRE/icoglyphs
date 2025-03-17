<script>
	import icoGlyphs from '$lib/index.js';
	import IcoGlyphLinked from '$lib/app/ui/components/IcoGlyphLinked.svelte';
	import SvgStyler from '$lib/app/ui/components/SvgStyler.svelte';
	import anime from 'animejs';
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import IcoGlypherDisplay from './IcoGlypherDisplay.svelte';
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';
	import {
		downloadPng,
		copySvgToClipBoard,
		downloadSvg
	} from '$lib/app/core/utils/export-tools.svelte.js';

	let { data } = $props();

	// Display all the icoGlyphs that have the same categories as the current icoGlyph
	const allPathKeys = [];
	Object.keys(icoGlyphs.library().svgData).forEach((key) => {
		const metadata = icoGlyphs.library().svgData[key].metadata;
		if (metadata?.categories?.some((category) => data?.metadata?.categories?.includes(category))) {
			allPathKeys.push(key);
		}
	});

	// main icoGlyphs animation

	let readyToAnimate = $state(false);

	setTimeout(() => {
		readyToAnimate = true;
	}, 500);

	function animationOnMouseEnter(d) {
		if (readyToAnimate) {
			anime({
				targets: '#icoglyph-container path',
				d: icoGlyphs.getPath(d),
				duration: 700,
				easing: 'easeInOutQuad'
			});
		}
	}

	function animationOnMouseLeave() {
		anime({
			targets: '#icoglyph-container path',
			d: icoGlyphs.getPath(data.name),
			duration: 700,
			easing: 'easeInOutQuad'
		});

		if (!readyToAnimate) {
			readyToAnimate = true;
		}
	}

	// Buttons data
	const downloadPngButton = new icoGlyphButtonPropsConstructor();
	downloadPngButton.add('download', () => downloadPng(data.name));

	const copySvgButton = new icoGlyphButtonPropsConstructor();
	copySvgButton.add('copy', () => copySvgToClipBoard(data.name));

	let tagsDisplay = $derived(
		icoGlyphs.searchIcoGlyph(data.name)?.metadata?.tags
			? icoGlyphs
					.searchIcoGlyph(data.name)
					.metadata.tags.map((tag) => `#${tag.toLowerCase()}`)
					.join(' ')
			: ''
	);
	// $inspect(tagsDisplay);
</script>

<main>
	<div id="main-container">
		<div id="top-container">
			<div id="icoglyph-container">
				<svg {...appState.icoGlyphUserSettings.style} {...icoGlyphs.getSvgAttributes(data.name)}>
					<path d={icoGlyphs.getPath(data.name)} />
				</svg>
			</div>

			<div id="buttonContainer">
				<IcoGlypherDisplay icoGlyphName={data.name} />
				<IcoGlyphButton buttonConfig={downloadPngButton} />
				<IcoGlyphButton buttonConfig={copySvgButton} />
			</div>
		</div>
		<SvgStyler />

		{#if icoGlyphs.searchIcoGlyph(data.name)?.metadata?.tags?.length > 0}
			<div id="tags-container" class="container-1 border-1">
				<h5>Tags</h5>
				<p>{tagsDisplay}</p>
			</div>
		{/if}

		{#if data.metadata?.categories && data.metadata.categories.length > 0}
			<div id="sub-icoglyphs-display" class="border-1 container-1">
				<h5>Related icoGlyphs</h5>
				{#each allPathKeys as pathKeys}
					{#if pathKeys !== data.name}
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<div
							onmouseenter={() => animationOnMouseEnter(pathKeys)}
							onmouseleave={animationOnMouseLeave}
							class="animableSet"
							onclick={() => (readyToAnimate = false)}
						>
							<IcoGlyphLinked icoGlyphName={pathKeys} size="small" />
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	#main-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: var(--max-width-medium);
		gap: var(--spacing-medium);
	}

	#top-container {
		width: 100%;
		height: 100%;
		max-width: var(--max-width-medium);
		position: relative;
	}

	#icoglyph-container {
		width: 100%;
		height: 100%;
		border: var(--b2) var(--border-width-medium) solid;
		border-radius: var(--border-radius);
		max-width: var(--max-width-medium);
	}

	#buttonContainer {
		position: absolute;
		margin: var(--spacing-medium) 0;
		gap: var(--spacing-medium);
		top: var(--spacing-small);
		right: -80px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	@media (max-width: 800px) {
		#buttonContainer {
			position: relative;
			flex-direction: row;
			justify-content: center;
			width: 100%;
			top: 0;
			right: 0;
		}
	}

	#tags-container {
		position: relative;
	}

	#tags-container p {
		font-size: 1rem;
		font-weight: 400;
		font-style: italic;
		text-align: center;
	}

	#sub-icoglyphs-display {
		margin-top: 30px;
		position: relative;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.container-1 h5 {
		position: absolute;
		top: -14px;
		background: var(--b1);
		padding: 0 var(--spacing-medium);
		z-index: 1;
		transform: translateX(-50%);
		left: 50%;
	}

	/* #tags-container h5 {
		position: absolute;
		top: -14px;
		background: var(--b1);
		padding: 0 var(--spacing-medium);
		z-index: 1;
	} */
</style>
