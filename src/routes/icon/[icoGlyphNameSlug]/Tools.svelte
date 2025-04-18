<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import BasicBlock from '$lib/app/ui/components/BasicBlock.svelte';
	import DesignerTools from './toolsComponents/DesignerTools.svelte';
	import DeveloperTools from './toolsComponents/DeveloperTools.svelte';
	import SvgExpertTools from './toolsComponents/SvgExpertTools.svelte';
	import icoGlyphs from '$lib/index.js';
	import { pushState } from '$app/navigation';
	import TabInterface from '$lib/app/ui/components/TabInterface.svelte';

	let { data } = $props();

	let noModesActivated = $derived(
		!(
			appState.modes.designerMode.value ||
			appState.modes.devMode.value ||
			appState.modes.svgExpertMode.value
		)
	);

	const tabs = ['Style', 'API', 'SVG options'];

	let tabsSelected = $state('Style');

	// $inspect(noModesActivated);
</script>

{#if noModesActivated}
	<BasicBlock>
		{#snippet title()}
			<h3>Tools</h3>
		{/snippet}

		{#snippet text()}
			<p>
				Whether you need to customize the icon, access our API to include it directly in your app,
				or anything else. <br /> We probably have the tools you need.
			</p>
		{/snippet}

		{#snippet el()}
			<button class="button-default" onclick={() => pushState('', { showSettings: true })}>
				<span>Get the tools you need</span>
				<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
					<path d={icoGlyphs.getPath('plurality')} />
				</svg>
			</button>
		{/snippet}
	</BasicBlock>
{:else}
	<BasicBlock>
		{#snippet title()}
			<h2>Tools</h2>
		{/snippet}

		{#snippet el()}
			<DesignerTools />

			<DeveloperTools />

			<SvgExpertTools {data} />
		{/snippet}
	</BasicBlock>
{/if}

<TabInterface {tabs} selected={tabsSelected}>
	{#snippet content(selected)}
		{#if 'Style' == selected}
			<DesignerTools />
		{:else if 'API' == selected}
			<DeveloperTools />
		{:else if 'SVG options' == selected}
			<SvgExpertTools {data} />
		{/if}
	{/snippet}
</TabInterface>

<style>
</style>
