<script>
	import { goto } from '$app/navigation';

	import MorphingPath from '$lib/app/ui/components/MorphingPath.svelte';
	import icoGlyphs from '$lib/index.js';

	import { pushState } from '$app/navigation';

	function openSettings() {
		pushState('', { showSettings: true });
	}
</script>

<div id="navbar-container">
	<ul>
		<li class="left">
			<a href="/" title="Home - IcoGlyphs">IcoGlyphs</a>
		</li>

		<li class="right">
			<button class="button-default navbar-button" onclick={openSettings}>
				<span>Settings</span>
				<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
					<MorphingPath IGName={'plurality'} />
				</svg>
			</button>
		</li>
	</ul>
</div>

<style>
	a {
		color: var(--t1);
		font-family: var(--typo1);
		font-weight: 500;
		font-size: 1.5rem;
	}

	.navbar-button {
		background: var(--b1);
	}

	.navbar-button:hover {
		background: var(--b2);
	}

	.navbar-button:active {
		background: var(--b4);
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
