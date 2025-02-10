<script>
	import icoGlyphs from '$lib/index.js';
	import { goto } from '$app/navigation';
	import globalVarFront from '$lib/globalVarFront.svelte.js';

	let { icoGlyphName } = $props();

	// $inspect(icoGlyphName);
</script>

{#if globalVarFront.showPrivateIcoGlyph.value || !icoGlyphName.startsWith('_')}
	<button
		onclick={() => goto(`/ico/${icoGlyphName}`)}
		aria-label={`Navigate to ${icoGlyphName} page`}
		class="icoglyphContainer"
	>
		<svg {...icoGlyphs.getSvgAttributes(icoGlyphName)}>
			<path d={icoGlyphs.getPath(icoGlyphName)} />
		</svg>
	</button>
{/if}

<style>
	svg {
		stroke-width: 3px;
		stroke: var(--t1);
		fill: none;
	}
	.icoglyphContainer {
		width: 150px;
		height: 150px;

		margin: 5px;
		border-radius: 5%;
	}
</style>
