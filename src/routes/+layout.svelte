<script>
	import Footer from './_layoutComponents/Footer.svelte';
	import NavBar from './_layoutComponents/NavBar.svelte';
	import { psi } from '$lib/design/psi';
	import globalVarFront from '$lib/globalVarFront.svelte.js';
	import { onMount } from 'svelte';

	onMount(() => {
		// globalVarFront.icoGlyphUserSettings.setIcoGlyphsUserStyle();

		const savedStyle = localStorage.getItem('icoGlyphsUserStyle');
		if (savedStyle) {
			globalVarFront.icoGlyphUserSettings.style = JSON.parse(savedStyle);
		} else {
			// Optionally, assign a default style if none is found
			globalVarFront.icoGlyphUserSettings.style = {
				stroke: '#777777',
				// stroke: 'var(--t1)',
				'stroke-linejoin': 'round',
				'stroke-linecap': 'round',
				'stroke-width': '6px',
				'stroke-opacity': 1,
				fill: 'none'
			};
			console.log('no store');
		}
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
