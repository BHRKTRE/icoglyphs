<script>
	import ColorModeButton from './ColorModeButton.svelte';
	import DesignerModeButton from './DesignerModeButton.svelte';
	import DevModeButton from './DevModeButton.svelte';
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';
	import { goto } from '$app/navigation';

	let homePageButton = new icoGlyphButtonPropsConstructor();
	homePageButton.add('home-page', () => goto('/'));

	let paramsButton = new icoGlyphButtonPropsConstructor();
	paramsButton.add('plurality', () => goto('/params'));
</script>

<div id="navbar-container">
	<ul>
		<!-- <li class="left"><IcoGlyphButton buttonConfig={homePageButton} /></li> -->
		<li class="left">
			<a href="/" title="Home - IcoGlyphs">IcoGlyphs</a>
		</li>

		<li class="right"><IcoGlyphButton buttonConfig={paramsButton} /></li>
		<li class="right"><ColorModeButton /></li>
	</ul>
</div>

<style>
	a {
		color: var(--t1);
		font-family: var(--typo1);
		font-weight: 500;
		font-size: 1.5rem;
	}

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
