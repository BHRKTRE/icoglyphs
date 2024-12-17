<script>
	import Hero from './Hero.svelte';
	import HowtoUse from './HowtoUse.svelte';
	import LinguisticDemo from './LinguisticDemo.svelte';
	import { psi } from '$lib/design/psi';
	import Tech from './Tech.svelte';
	import ContactUs from './ContactUs.svelte';

	let windowHeight = $state(0);

	let minSectionHeight = $derived(windowHeight / psi + 'px');

	// $inspect(minSectionHeight);
</script>

<svelte:window bind:innerHeight={windowHeight} />

<Hero {minSectionHeight} />

<LinguisticDemo {minSectionHeight} />

<HowtoUse {minSectionHeight} />

<Tech {minSectionHeight} />

<ContactUs {minSectionHeight} />
