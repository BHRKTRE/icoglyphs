<script>
	import icoGlyphs from '$lib/index.js';
	import IcoGlyphLinked from '$lib/app/ui/components/IcoGlyphLinked.svelte';
	import SvgStyler from './SvgStyler.svelte';
	import anime from 'animejs';
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import IcoGlypherModeDisplay from './IcoGlypherModeDisplay.svelte';
	import MainIcoG from './mainIcoG.svelte';
	import MorphingPath from '$lib/app/ui/components/MorphingPath.svelte';
	import {
		downloadPng,
		copySvgToClipBoard,
		downloadSvg
	} from '$lib/app/core/utils/export-tools.svelte.js';
	import TagsDisplay from './TagsDisplay.svelte';
	import BasicBlock from '$lib/app/ui/components/BasicBlock.svelte';
	import { page } from '$app/state';

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

	// $inspect(page.url);
</script>

<svelte:head>
	<meta name="description" content="{data.aliases?.[0] || 'Unnamed'} – free icon." />
	<meta
		name="keywords"
		content="{data.aliases?.[0] ||
			'Unnamed'}, icons, glyphs, universal icons, ideographic, design, API, customizable, SVG, PNG, open-source, free, visual language"
	/>
	<meta name="author" content="IcoGlyphs Crew" />
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content="'{data.aliases?.[0] || 'Unnamed'}' icon" />
	<meta
		property="og:description"
		content="'{data.aliases?.[0] ||
			'Unnamed'}' icon created through the research of signs, shapes, and forms."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url} />
	<!-- <meta property="og:image" content="https://www.icoglyphs.com/assets/images/og-image.jpg" /> -->
	<meta name="twitter:title" content="'{data.aliases?.[0] || 'Unnamed'}' icon" />
	<meta
		name="twitter:description"
		content="'{data.aliases?.[0] ||
			'Unnamed'}' icon created through the research of signs, shapes, and forms."
	/>
	<!-- <meta name="twitter:image" content="https://www.icoglyphs.com/assets/images/twitter-image.jpg"> -->
	<meta name="twitter:card" content="summary_large_image" />
	<title>'{data.aliases?.[0] || 'Unnamed'}' icon</title>
</svelte:head>

<main>
	<div id="main-container">
		{#if data.aliases}
			<h1>{data.aliases[0]} – free icon</h1>
		{/if}
		<MainIcoG {data} />
		<div id="buttonContainer">
			<BasicBlock>
				{#snippet el()}
					{#if !appState.modes.devMode.value && !appState.modes.designerMode.value}
						<button class="button-default" onclick={() => downloadPng(data.name)}>
							<span>Download icon's image</span>
							<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
								<MorphingPath IGName={'download'} />
							</svg>
						</button>
					{/if}
					{#if appState.modes.devMode.value}
						<button class="button-default" onclick={() => copySvgToClipBoard(data.name)}>
							<span>Copy SVG to clipboard</span>
							<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
								<MorphingPath IGName={'copy'} />
							</svg>
						</button>
					{/if}
					{#if appState.modes.designerMode.value || appState.modes.devMode.value}
						<button class="button-default" onclick={() => downloadPng(data.name)}>
							<span>Download icon's PNG</span>
							<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
								<MorphingPath IGName={'download'} />
							</svg>
						</button>
						<button class="button-default" onclick={() => downloadSvg(data.name)}>
							<span>Download icon's SVG</span>
							<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
								<MorphingPath IGName={'download'} />
							</svg>
						</button>
					{/if}
					<button
						class="button-default"
						onclick={() => (appState.IgSettingsIsOpen = !appState.IgSettingsIsOpen)}
					>
						<span>Open settings</span>
						<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
							<MorphingPath IGName={'plurality'} />
						</svg>
					</button>
				{/snippet}
			</BasicBlock>
		</div>

		<IcoGlypherModeDisplay icoGlyphName={data.name} />

		<SvgStyler />
		<TagsDisplay icoGlyphName={data.name} />

		{#if data.metadata?.categories && data.metadata.categories.length > 0}
			<BasicBlock>
				{#snippet title()}
					<h2>Related icoglyphs</h2>
				{/snippet}
				{#snippet text()}
					Icoglyphs can be grouped by categories that reflect shared meaning or related concepts.
					The icons below share at least one and support animation.
				{/snippet}
				{#snippet el()}
					<div id="sub-icoglyphs-display">
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
				{/snippet}
			</BasicBlock>
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

	h1 {
		font-size: 1.2rem;
		text-transform: capitalize;
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
		display: flex;
		flex-direction: column;
	}

	#buttonContainer {
		display: flex;
		align-items: center;

		position: relative;

		max-width: 500px;
		left: 0;
	}

	#buttonContainer button {
		width: 100%;
	}

	#sub-icoglyphs-display {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		gap: var(--spacing-medium);
	}
</style>
