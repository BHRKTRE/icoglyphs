<script>
	import icoGlyphs from '$lib/index.js';
	import { goto } from '$app/navigation';
	import appState from '$lib/app/core/stores/appState.svelte.js';

	let { icoGlyphName, size = 'medium' } = $props();

	const dimensions = {
		small: 60,
		medium: 130
	};

	// $inspect(appState.icoGlyphStyles);
</script>

<button
	onclick={() => goto(`/ico/${icoGlyphName}`)}
	aria-label={`Navigate to ${icoGlyphName} page`}
	class="icoglyphContainer"
	style={`width: ${dimensions[size]}px; height: ${dimensions[size]}px;`}
>
	<svg {...appState.icoGlyphUserSettings.style} {...icoGlyphs.getSvgAttributes(icoGlyphName)}>
		<path d={icoGlyphs.getPath(icoGlyphName)} />
	</svg>
</button>

<style>
	.icoglyphContainer {
		border-radius: var(--border-radius);
	}
</style>
