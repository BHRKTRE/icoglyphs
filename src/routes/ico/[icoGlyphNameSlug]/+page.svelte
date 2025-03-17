<script>
	import icoGlyphs from '$lib/index.js';
	import IcoGlyphLinked from '$lib/app/ui/components/IcoGlyphLinked.svelte';
	import CopySvgButton from '$lib/app/ui/components/button/CopySvgButton.svelte';
	import DownLoadSvgButton from '$lib/app/ui/components/button/DownLoadSvgButton.svelte';
	import DownLoadPngButton from '$lib/app/ui/components/button/DownLoadPngButton.svelte';
	import SvgStyler from '$lib/app/ui/components/SvgStyler.svelte';
	import anime from 'animejs';
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import IcoGlypherDisplay from './IcoGlypherDisplay.svelte';

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

	// $inspect('front', appState.icoGlyphUserSettings.style);
</script>

<main>
	<div id="icoglyph-container">
		<svg {...appState.icoGlyphUserSettings.style} {...icoGlyphs.getSvgAttributes(data.name)}>
			<path d={icoGlyphs.getPath(data.name)} />
		</svg>
	</div>

	<div id="buttonContainer">
		<IcoGlypherDisplay icoGlyphName={data.name} />
		<CopySvgButton icoGlyphName={data.name} />
		<DownLoadSvgButton icoGlyphName={data.name} />
		<DownLoadPngButton icoGlyphName={data.name} />
	</div>
	<SvgStyler />

	<div id="subIcoGlyphsDisplay">
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
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	#subIcoGlyphsDisplay {
		margin-top: 30px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--spacing-medium);
		padding: var(--spacing-medium);
	}

	#buttonContainer {
		margin: var(--spacing-medium) 0;
		gap: var(--spacing-medium);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 100%;
		max-width: var(--max-width-medium);
	}

	#icoglyph-container {
		width: 100%;
		height: 100%;
		border: var(--b2) var(--border-width-medium) solid;
		border-radius: var(--border-radius);
		max-width: var(--max-width-medium);
	}
</style>
