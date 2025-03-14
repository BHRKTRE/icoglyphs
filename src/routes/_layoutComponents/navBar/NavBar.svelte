<script>
	import ColorModeButton from './ColorModeButton.svelte';
	import DesignerModeButton from './DesignerModeButton.svelte';
	import DevModeButton from './DevModeButton.svelte';
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';
	import { goto } from '$app/navigation';

	let homePageButton = new icoGlyphButtonPropsConstructor();
	homePageButton.add('home-page', () => goto('/'));
</script>

<div id="navbar-container">
	<ul>
		<li class="left"><IcoGlyphButton buttonConfig={homePageButton} /></li>
		<!-- <li><a href="/params"><h5>Params</h5></a></li> -->

		<!-- <li class="right"><DevModeButton /></li> -->
		<!-- <li class="right"><DesignerModeButton /></li> -->
		<li class="right"><ColorModeButton /></li>
	</ul>
</div>

<style>
	#navbar-container {
		margin: var(--spacing-medium) 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 50px;
	}
	/* #navbar-container h5 {
		color: var(--t1);
	} */

	ul {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.left {
		margin-right: auto; /* Pousse tout le reste à droite */
	}
	.right {
		margin-left: var(--spacing-small); /* Ajoute un petit espace entre les boutons de droite */
	}
</style>
