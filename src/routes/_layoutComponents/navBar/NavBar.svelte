<script>
	import { goto } from '$app/navigation';
	import appState from '$lib/app/core/stores/appState.svelte.js';
</script>

<div id="navbar-container">
	<ul>
		<li class="left">
			<a href="/" title="Home - IcoGlyphs">IcoGlyphs</a>
		</li>

		<!-- <li class="right"><ColorModeButton /></li> -->
	</ul>
	<!-- {#if appState.IgSettingsIsOpen}
		<div id="params-container">
			<Params />
		</div>
		<div onclick={paramsButtonAction} id="background-overlay"></div>
	{/if} -->
</div>

<style>
	/* #params-container {
		position: absolute;
		top: 70px;
		background-color: var(--b1);
		border: 2px solid var(--t1);
		border-radius: var(--border-radius);
		padding: var(--spacing-small);
		z-index: 11;
	}
	#background-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 10;
	} */
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

		border-bottom: var(--border-width-small) solid var(--b2);
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
		margin-right: auto;
	}
	/* .right {
		margin-left: var(--spacing-small); */
	/* } */
</style>
