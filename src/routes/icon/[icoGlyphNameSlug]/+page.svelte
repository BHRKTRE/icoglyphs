<script>
	import icoGlyphs from '$lib/index.js';
	import SvgStyler from './SvgStyler.svelte';
	import IcoGlypherModeDisplay from './IcoGlypherModeDisplay.svelte';
	import MainIcoG from './mainIcoG.svelte';
	import TagsDisplay from './TagsDisplay.svelte';
	import Metadata from './Metadata.svelte';
	import Buttons from './Buttons.svelte';
	import RelatedIcoG from './RelatedIcoG.svelte';

	let { data } = $props();

	// Display all the icoGlyphs that have the same categories as the current icoGlyph
	const allPathKeys = [];
	Object.keys(icoGlyphs.library().svgData).forEach((key) => {
		const metadata = icoGlyphs.library().svgData[key].metadata;
		if (metadata?.categories?.some((category) => data?.metadata?.categories?.includes(category))) {
			allPathKeys.push(key);
		}
	});

	function capitalizeTitle(str) {
		return str
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
	}

	$inspect(icoGlyphs.getCompleteSvg(data.name, { simplified: true }));
</script>

<Metadata {data} {capitalizeTitle} />

<main>
	{#if data.aliases}
		<h1>{capitalizeTitle(data.aliases?.[0] || 'Unnamed')} – free icon</h1>
	{/if}
	<div id="main-ig-container">
		<MainIcoG {data} />
	</div>

	<div id="lm-container">
		<div id="lmt-container">
			<div id="buttonContainer">
				<Buttons {data} />
			</div>

			<IcoGlypherModeDisplay icoGlyphName={data.name} />

			<SvgStyler />
		</div>

		<RelatedIcoG {data} />
	</div>

	<div id="br-container">
		<TagsDisplay icoGlyphName={data.name} />
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-areas:
			'tr .'
			'rm lm'
			'br lm'
			'br .';

		margin: 0 auto;
		width: 100%;
		gap: var(--spacing-medium);
		max-width: 1030px;
	}

	#lm-container {
		grid-area: lm;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-medium);
		width: 100%;
	}

	#lmt-container {
		grid-area: lm;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-medium);
	}

	#main-ig-container {
		grid-area: rm;
		width: 100%;
		aspect-ratio: 1 / 1;
		max-width: 580px;
	}

	#br-container {
		grid-area: br;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-medium);
		max-width: 580px;
	}

	h1 {
		grid-area: tr;

		font-size: 1.2rem;
	}

	#buttonContainer {
		display: flex;
		grid-area: r;
		align-items: center;

		position: relative;

		max-width: 250px;
		left: 0;
	}

	@media (max-height: 1050px) {
		#main-ig-container {
			max-width: 400px;
		}

		#br-container {
			max-width: 400px;
		}

		main {
			justify-items: end;
		}
	}

	@media (max-height: 850px) {
		#main-ig-container {
			max-width: 300px;
		}

		#br-container {
			max-width: 300px;
		}
	}

	@media (max-width: 670px) {
		main {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		#lm-container {
			grid-area: lm;
			display: flex;
			flex-direction: column;

			gap: var(--spacing-medium);
			max-width: 580px;
		}

		#lmt-container {
			grid-area: lm;
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			justify-content: center;

			gap: var(--spacing-medium);
			width: 100%;
		}

		#main-ig-container {
			max-width: 300px;
		}
	}

	@media (max-width: 620px) {
		#lmt-container {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}

	@media (max-width: 350px) {
		#buttonContainer {
			max-width: none;
		}

		#main-ig-container {
			max-width: 100%;
		}
	}
</style>
