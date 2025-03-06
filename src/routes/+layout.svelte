<script>
	import Footer from './_layoutComponents/Footer.svelte';
	import NavBar from './_layoutComponents/navBar/NavBar.svelte';
	import psi from '$lib/app/ui/utils/psi.js';
	import { onMount } from 'svelte';
	import { applySvgUserStyles } from '$lib/app/core/utils/applySvgUserStyles.svelte.js';

	// make animation for waiting for the page to be ready
	let readyToDisplay = $state(false);

	onMount(() => {
		applySvgUserStyles();
		readyToDisplay = true;
	});

	// $inspect(appState.icoGlyphUserSettings.style);

	let { children } = $props();

	let windowWidth = $state(0);

	let sideMargin = $derived(windowWidth / Math.pow(psi, 10) + 'px');

	// $inspect(sideMargin);
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if readyToDisplay}
	<NavBar />

	<div style="margin: 0 {sideMargin};" id="page-wrapper">
		{@render children?.()}
	</div>

	<Footer />
{/if}
