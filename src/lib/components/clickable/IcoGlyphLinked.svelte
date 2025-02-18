<script>
	import icoGlyphs from '$lib/index.js';
	import { goto } from '$app/navigation';
	import globalVarFront from '$lib/globalVarFront.svelte.js';

	let { icoGlyphName, size = 'medium' } = $props();

	const dimensions = {
		small: 60,
		medium: 130
	};

	// $inspect(globalVarFront.icoGlyphStyles);
</script>

{#if globalVarFront.showPrivateIcoGlyph.value || !icoGlyphName.startsWith('_')}
	<button
		onclick={() => goto(`/ico/${icoGlyphName}`)}
		aria-label={`Navigate to ${icoGlyphName} page`}
		class="icoglyphContainer"
		style={`width: ${dimensions[size]}px; height: ${dimensions[size]}px;`}
	>
		<svg
			{...globalVarFront.icoGlyphUserSettings.style}
			{...icoGlyphs.getSvgAttributes(icoGlyphName)}
		>
			<path d={icoGlyphs.getPath(icoGlyphName)} />
		</svg>
	</button>
{/if}

<style>
	.icoglyphContainer {
		margin: 5px;
		border-radius: 5%;
	}
</style>
