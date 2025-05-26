<script>
	import BasicBlock from '$lib/app/components/BasicBlock.svelte';
	import icoGlyphs from '$lib/index.js';
	import IcoGlyphLinked from '$lib/app/components/IcoGlyphLinked.svelte';
	import { animate, svg } from 'animejs';

	let { data } = $props();

	// main icoGlyphs animation

	let readyToAnimate = $state(false);

	setTimeout(() => {
		readyToAnimate = true;
	}, 500);

	// Display all the icoGlyphs that have the same categories as the current icoGlyph
	const allPathKeys = [];
	icoGlyphs.db.forEach((icon) => {
		if (icon?.categories?.some((category) => data?.categories?.includes(category))) {
			allPathKeys.push(icon.aliases[0]);
		}
	});

	// $inspect(allPathKeys);

	// Using morphTo() from animejs ?
	// https://animejs.com/documentation/svg/morphto

	function animationOnMouseEnter(d) {
		if (readyToAnimate) {
			animate('#icoglyph-container path', {
				d: icoGlyphs.getPath(d),
				duration: 700,
				easing: 'easeInOutQuad'
			});
		}
	}

	function animationOnMouseLeave() {
		animate('#icoglyph-container path', {
			d: icoGlyphs.getPath(data.name),
			duration: 700,
			easing: 'easeInOutQuad'
		});

		if (!readyToAnimate) {
			readyToAnimate = true;
		}
	}
</script>

{#if data.categories && data.categories.length > 0}
	<BasicBlock>
		{#snippet title()}
			<h2>Related icoglyphs</h2>
		{/snippet}
		{#snippet text()}
			Icoglyphs can be grouped by categories that reflect shared meaning or related concepts. The
			icons below share at least one and support animation.
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

<style>
	#sub-icoglyphs-display {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		gap: var(--spacing-medium);
	}
</style>
