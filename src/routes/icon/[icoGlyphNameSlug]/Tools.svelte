<script>
	import appState from '$lib/app/appState.svelte.js';
	import BasicBlock from '$lib/app/components/BasicBlock.svelte';
	import DesignerTools from './toolsComponents/DesignerTools.svelte';
	import DeveloperTools from './toolsComponents/DeveloperTools.svelte';
	import SvgExpertTools from './toolsComponents/SvgExpertTools.svelte';
	import icoGlyphs from '$lib/index.js';

	import TabInterface from '$lib/app/components/TabInterface.svelte';

	let { data } = $props();

	const tabs = ['Style', 'SVG Toolkit'];

	$effect(() => {
		const userSettings = Object.fromEntries(
			Object.entries(appState.userSettings).map(([key, data]) => [key, data])
		);
		localStorage.setItem('userSettings', JSON.stringify(userSettings));
	});

	// $inspect(appState.userSettings.iconToolsTabSelected);
</script>

<TabInterface {tabs} bind:selected={appState.userSettings.iconToolsTabSelected}>
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
