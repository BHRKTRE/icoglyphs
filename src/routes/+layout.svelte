<script>
	import Footer from './_layoutComponents/Footer.svelte';
	import NavBar from './_layoutComponents/navBar/NavBar.svelte';
	import psi from '$lib/app/utils/psi.js';
	import '../app.css';

	let readyToDisplay = $state(false);

	$effect(() => {
		readyToDisplay = true;
	});

	// $inspect(appState.icoGlyphUserSettings.style);

	let { children } = $props();

	let windowWidth = $state(0);

	let sideMargin = $derived(windowWidth / Math.pow(psi, 10) + 'px');

	// $inspect(1 / psi ** 2);
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if readyToDisplay}
	<div style="margin: 0 {sideMargin};" id="page-wrapper">
		<NavBar />

		{@render children?.()}
		<div id="footer-spacing"></div>
		<div id="footer-container">
			<Footer />
		</div>
	</div>
{/if}

<style>
	#page-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	#footer-spacing {
		height: 70px;
	}
	#footer-container {
		margin-top: auto;
		margin-bottom: var(--spacing-medium);
	}
</style>
