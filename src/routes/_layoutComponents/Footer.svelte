<script>
	import externalLinks from '$lib/app/core/utils/externalLinks.js';

	// $inspect(discordButton);
</script>

<footer>
	<div id="top-container">
		<ul id="footer-links">
			<li><a href={externalLinks.github} target="_blank">Github</a></li>
			<li><a href={externalLinks.discord} target="_blank">Discord</a></li>
		</ul>
	</div>

	<div id="footer-info">
		<p>© 2025 - IcoGlyphs. Licence GNU GPL v3.</p>
	</div>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		align-items: center;

		border-top: 2px solid var(--b2);
		padding-top: var(--spacing-small);
	}

	#footer-links {
		display: flex;
		justify-content: space-between;
		gap: var(--spacing-medium);
	}

	#footer-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	#top-container {
		margin-top: 20px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	a {
		font-weight: 300;
	}

	a:hover {
		font-weight: 400;
	}
	p {
		font-weight: 300;
		font-size: 0.8rem;
		margin-top: var(--spacing-small);
	}
	/* svg {
		height: 40px;
		stroke-width: 4px;
		stroke: var(--t1);
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-opacity: 1;
		fill: none;
	} */

	@media (max-width: 400px) {
		/* svg {
			height: 30px;
		} */
		p {
			font-size: 0.7rem;
		}
	}
</style>
