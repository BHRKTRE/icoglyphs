<script>
	import externalLinks from '$lib/app/core/utils/externalLinks.js';
	import appState from '$lib/app/core/stores/appState.svelte.js';

	// for snippet
	// let modes = $state([appState.modes.colorMode.value, appState.modes.devMode.value, appState.modes.icoGlypherMode.value]);

	// $inspect(discordButton);
</script>

<footer>
	<ul class="footer-links">
		<li><a href={externalLinks.github} target="_blank">Github</a></li>
		<li><a href={externalLinks.discord} target="_blank">Discord</a></li>
	</ul>
	<p id="license">license</p>

	<!-- {#snippet modesDisplay(modes)}{/snippet} -->
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
	}
</style>
