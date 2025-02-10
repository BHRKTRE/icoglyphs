<script>
	import icoGlyphs from '$lib/index.js';
	import { goto } from '$app/navigation';
	import globalVarFront from '$lib/globalVarFront.svelte.js';

	let { icoGlyphName, size = 'medium' } = $props();

	let dimensions = {
		small: 60,
		medium: 150
	};

	// $inspect(icoGlyphName);
</script>

{#if globalVarFront.showPrivateIcoGlyph.value || !icoGlyphName.startsWith('_')}
	<button
		onclick={() => goto(`/ico/${icoGlyphName}`)}
		aria-label={`Navigate to ${icoGlyphName} page`}
		class="icoglyphContainer"
		style={`width: ${dimensions[size]}px; height: ${dimensions[size]}px;`}
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
		margin: 5px;
		border-radius: 5%;
	}
</style>
