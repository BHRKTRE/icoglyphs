<script>
	import Footer from './Footer.svelte';
	import NavBar from './NavBar.svelte';
	import { psi } from '$lib/design/psi';

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
