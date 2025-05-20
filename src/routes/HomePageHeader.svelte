<script>
	import psi from '$lib/app/utils/psi.js';

	let innerWidth = $state(0);

	let h1FontSize = $derived(innerWidth / psi ** 11 + 'px');
	let h2FontSize = $derived(innerWidth / psi ** 13 + 'px');

	// $inspect(innerWidth);
</script>

<svelte:window bind:innerWidth />

<header>
	<h1 style:font-size="clamp(1.4rem, {h1FontSize}, 8rem)">Free Icons for Universal Expression</h1>
	<h2 style:font-size="clamp(1rem, {h2FontSize}, 7rem)">
		Crafted from the research of signs, shapes, and forms.<br />
		Effortlessly customizable, usable, and animation-ready.
	</h2>

	<div class="construction-banner">
		<p>[ Project under construction ]</p>
	</div>
</header>

<style>
	.construction-banner {
		text-align: center;
		padding: var(--spacing-medium) 20px;
	}

	.construction-banner p {
		margin: 0;
		color: var(--t1);
		font-weight: 500;
		font-size: 1rem;
	}

	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-small);
		padding-bottom: var(--spacing-medium);
		margin-bottom: var(--spacing-medium);
		border-bottom: var(--border-width-small) solid var(--b2);
	}

	h1 {
		text-align: center;
	}

	h2 {
		text-align: center;
		font-weight: 400;
	}

	/* #features {
		display: flex;
		flex-direction: row;
		gap: var(--spacing-medium);
		justify-content: center;
		align-items: center;
	}

	#features h2 {
		background: var(--b2);
	} */
</style>
