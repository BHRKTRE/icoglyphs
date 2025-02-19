<script>
	import Footer from './_layoutComponents/Footer.svelte';
	import NavBar from './_layoutComponents/NavBar.svelte';
	import globalVarFront from '$lib/globalVarFront.svelte.js';
	import { onMount } from 'svelte';
	import { applySvgUserStyles } from '$lib/design/applySvgUserStyles.svelte.js';

	// make animation for waiting for the page to be ready
	let readyToDisplay = $state(false);

	onMount(() => {
		applySvgUserStyles();
		readyToDisplay = true;
	});

	// $inspect(globalVarFront.icoGlyphUserSettings.style);

	let { children } = $props();

	let windowWidth = $state(0);

	let sideMargin = $derived(windowWidth / Math.pow(globalVarFront.psi, 10) + 'px');

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
