<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import BasicBlock from '$lib/app/ui/components/BasicBlock.svelte';
	import DesignerTools from './toolsComponents/DesignerTools.svelte';
	import DeveloperTools from './toolsComponents/DeveloperTools.svelte';
	import SvgExpertTools from './toolsComponents/SvgExpertTools.svelte';
	import icoGlyphs from '$lib/index.js';

	import TabInterface from '$lib/app/ui/components/TabInterface.svelte';

	let { data } = $props();

	const tabs = ['Style', 'SVG Toolkit'];

	let tabsSelected = $state('Style');

	// $inspect(noModesActivated);
</script>

<TabInterface {tabs} selected={tabsSelected}>
	{#snippet content(selected)}
		{#if 'Style' == selected}
			<DesignerTools />
		{:else if 'API' == selected}
			<DeveloperTools />
		{:else if 'SVG Toolkit' == selected}
			<SvgExpertTools {data} />
		{/if}
	{/snippet}
</TabInterface>

<style>
</style>
