<script>
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import BasicBlock from '$lib/app/ui/components/BasicBlock.svelte';
	import DesignerTools from './toolsComponents/DesignerTools.svelte';
	import DeveloperTools from './toolsComponents/DeveloperTools.svelte';

	let titleSection = $derived.by(() => {
		if (appState.modes.designerMode.value == true && appState.modes.devMode.value == true) {
			return 'Designer & Developer tools';
		} else if (appState.modes.designerMode.value == true) {
			return 'Designer tools';
		} else if (appState.modes.devMode.value == true) {
			return 'Developer tools';
		}
	});

	// $inspect(appState.icoGlyphUserSettings.style);
</script>

{#if appState.modes.designerMode.value == true || appState.modes.devMode.value == true}
	<BasicBlock>
		{#snippet title()}
			<h2>{titleSection}</h2>
		{/snippet}

		<!-- {#snippet text()}
			You can have more options to customize your experience in the settings menu.
		{/snippet} -->

		{#snippet el()}
			<DesignerTools />

			<DeveloperTools />
		{/snippet}
	</BasicBlock>
{/if}

<style>
</style>
