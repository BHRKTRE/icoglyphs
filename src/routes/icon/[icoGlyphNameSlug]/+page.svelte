<script>
	import icoGlyphs from '$lib/index.js';
	import IcoGlyphLinked from '$lib/app/ui/components/IcoGlyphLinked.svelte';
	import SvgStyler from '$lib/app/ui/components/SvgStyler.svelte';
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

	// $inspect(tagsDisplay);
</script>

<main>
	<div id="main-container">
		<div id="top-container">
			<MainIcoG IGname={data.name} />

			<div id="buttonContainer">
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
			</div>

			<IcoGlypherModeDisplay icoGlyphName={data.name} />
		</div>
		<SvgStyler />
		<TagsDisplay icoGlyphName={data.name} />

		{#if data.metadata?.categories && data.metadata.categories.length > 0}
			<div id="sub-icoglyphs-display" class="border-1 container-1">
				<!-- <h5>Related icoGlyphs</h5> -->
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

	#buttonContainer {
		position: absolute;
		margin: 0;
		gap: var(--spacing-medium);
		top: 0;
		left: 510px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}

	@media (max-width: 930px) {
		#buttonContainer {
			position: relative;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			max-width: 500px;
			top: var(--spacing-medium);
			left: 0;
			margin-bottom: var(--spacing-medium);
		}
	}

	#sub-icoglyphs-display {
		margin-top: var(--spacing-medium);
		position: relative;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
