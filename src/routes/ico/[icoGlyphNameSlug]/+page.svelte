<script>
	import icoGlyphs from '$lib/index.js';
	import IcoGlyphLinked from '$lib/components/clickable/IcoGlyphLinked.svelte';
	import CopySvgButton from '$lib/components/button/CopySvgButton.svelte';
	import DownLoadSvgButton from '$lib/components/button/DownLoadSvgButton.svelte';
	import DownLoadPngButton from '$lib/components/button/DownLoadPngButton.svelte';
	import SvgStyler from '$lib/components/SvgStyler.svelte';
	import anime from 'animejs';
	import globalVarFront from '$lib/globalVarFront.svelte.js';

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

	// $inspect('front', globalVarFront.icoGlyphUserSettings.style);
</script>

<main>
	<div id="icoglyph-container">
		<svg {...globalVarFront.icoGlyphUserSettings.style} {...icoGlyphs.getSvgAttributes(data.name)}>
			<path d={icoGlyphs.getPath(data.name)} />
		</svg>
	</div>

	<div id="buttonContainer">
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
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	#buttonContainer {
		margin: 10px;
		gap: 10px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	#icoglyph-container {
		width: 100%;
		height: 100%;
		border: var(--b2) 3px solid;
		margin: 5px;
		border-radius: var(--br);
		max-width: 500px;
	}
</style>
