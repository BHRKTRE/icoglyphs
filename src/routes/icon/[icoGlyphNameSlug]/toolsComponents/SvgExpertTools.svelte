<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import BasicBlock from '$lib/app/ui/components/BasicBlock.svelte';
	import icoGlyphs from '$lib/index.js';
	import MorphingPath from '$lib/app/ui/components/MorphingPath.svelte';

	let { data } = $props();
</script>

{#if appState.modes.svgExpertMode.value == true}
	<BasicBlock>
		{#snippet title()}
			<h3>Advanced SVG</h3>
		{/snippet}
		{#snippet subBlock()}
			<BasicBlock>
				{#snippet title()}
					<h4>Path</h4>
				{/snippet}
				{#snippet el()}
					<code>{icoGlyphs.getPath(data.name)}</code>
				{/snippet}
			</BasicBlock>
			<BasicBlock>
				{#snippet title()}
					<h4>Simplified path</h4>
				{/snippet}
				{#snippet text()}
					Once activated, the path will be simplified. Most animations between icons will no longer
					be possible. However, this is useful for engraving or laser cutting.
				{/snippet}
				{#snippet subBlock()}
					<button class="button-default" onclick={() => console.log('test')}>
						<span>Off / On</span>
						<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
							<MorphingPath IGName={'on'} />
						</svg>
					</button>
				{/snippet}
			</BasicBlock>
		{/snippet}
	</BasicBlock>
{/if}

<style>
</style>
