<script>
	import icoGlyphs from 'icoglyphs';
	import { goto } from '$app/navigation';
	import globlaVar from '$lib/globalVar.svelte.js';

	let { icoGlyphCat, icoGlyphName } = $props();

	const link = icoGlyphName ? `/ico/${icoGlyphCat}/${icoGlyphName}` : `/ico/${icoGlyphCat}`;

	const ariaLabel = `Navigate to ${icoGlyphCat} page`;

	// $inspect(icoGlyphName);
</script>

{#if icoGlyphName}
	{#if globlaVar.showPrivateIcoGlyph.value || !icoGlyphName.startsWith('_')}
		<button onclick={() => goto(link)} aria-label={ariaLabel} class="icoglyphContainer">
			<svg {...icoGlyphs.getSvgAttributes(icoGlyphCat)}>
				<path d={icoGlyphs.getPath(icoGlyphCat, icoGlyphName)} />
			</svg>
		</button>
	{/if}
{:else if globlaVar.showPrivateIcoGlyph.value || !icoGlyphCat.startsWith('_')}
	<button onclick={() => goto(link)} aria-label={ariaLabel} class="icoglyphContainer">
		<svg {...icoGlyphs.getSvgAttributes(icoGlyphCat)}>
			<path d={icoGlyphs.getPath(icoGlyphCat)} />
		</svg>
	</button>
{/if}

<style>
	svg {
		stroke-width: 3px;
		stroke: rgb(233, 208, 208);
		fill: none;
	}
	.icoglyphContainer {
		width: 150px;
		height: 150px;

		border: rgb(141, 116, 116) 2px solid;
		margin: 5px;
		border-radius: 5%;
	}
</style>
