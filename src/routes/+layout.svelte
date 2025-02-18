<script>
	import Footer from './_layoutComponents/Footer.svelte';
	import NavBar from './_layoutComponents/NavBar.svelte';
	import { psi } from '$lib/design/psi';
	import { onMount } from 'svelte';
	import { applySvgUserStyles } from '$lib/design/applySvgUserStyles.svelte.js';

	onMount(() => {
		applySvgUserStyles(); // Appel correct de la fonction
	});

	// $inspect(globalVarFront.icoGlyphUserSettings.style);

	let { children } = $props();

	let windowWidth = $state(0);

	let sideMargin = $derived(windowWidth / Math.pow(psi, 10) + 'px');

	// $inspect(sideMargin);
</script>

<svelte:window bind:innerWidth={windowWidth} />

<NavBar />

<div style="margin: 0 {sideMargin};" id="page-wrapper">
	{@render children?.()}
</div>

<Footer />
