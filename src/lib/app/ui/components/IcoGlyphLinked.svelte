<script>
	import icoGlyphs from '$lib/index.js';
	import { goto } from '$app/navigation';
	import appState from '$lib/app/core/stores/appState.svelte.js';

	let { icoGlyphName, size = 'medium' } = $props();

	const dimensions = {
		small: 60,
		medium: 130
	};

	function getIcoGlyphSlug() {
		if (icoGlyphs.library().svgData[icoGlyphName].aliases) {
			return icoGlyphs.library().svgData[icoGlyphName].aliases[0];
		} else {
			return icoGlyphName;
		}
	}

	// $inspect(getIcoGlyphSlug());
</script>

<button
	onclick={() => goto(`/ico/${getIcoGlyphSlug()}`)}
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
		background: none;
	}

	.icoglyphContainer:hover {
		background: var(--b2);
	}

	.icoglyphContainer:active {
		background: var(--b3);
	}
</style>
