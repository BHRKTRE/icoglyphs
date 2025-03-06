<script>
	import ColorModeButton from './ColorModeButton.svelte';
</script>

<div id="navbar-container">
	<ul>
		<li><a href="/"><h5>Home</h5></a></li>
		<li><a href="/params"><h5>Params</h5></a></li>
		<li><ColorModeButton /></li>
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
	#navbar-container h5 {
		color: var(--t1);
	}

	ul {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 100%;
	}
</style>
