<script>
	import icoGlyphs from 'icoglyphs';
	import IcoGlyphLinked from '$lib/components/clickable/IcoGlyphLinked.svelte';

	let { data } = $props();

	const allPathKeys = [];

	for (const icoGlyphName in icoGlyphs.library().svgData[data.name].path) {
		allPathKeys.push(icoGlyphName);
	}

	export const namePageOf = $state(data.name);

	// $inspect(nameOf);
</script>

<main>
	<div class="icoglyph-container">
		<svg {...icoGlyphs.getSvgAttributes(data.name)}>
			<path d={icoGlyphs.getPath(data.name)} />
		</svg>
	</div>

	<div id="subIcoGlyphsDisplay">
		{#each allPathKeys as pathKeys}
			<IcoGlyphLinked icoGlyphName={data.name} icoGlyphSubName={pathKeys} />
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

	.icoglyph-container {
		width: 100%;
		height: 100%;

		border: rgb(141, 116, 116) 1px solid;
		margin: 5px;
		border-radius: 5%;
	}
</style>
