<script>
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';
	import psi from '$lib/app/ui/utils/psi.js';

	let bbb = $state(new icoGlyphButtonPropsConstructor());
	bbb.add('arrow_left', () => console.log('function 2'), {
		to: 'arrow_top',
		tooltip: bbb.tooltip('a faire', 'bottom')
	});
	bbb.add('arrow_right', () => console.log('function 1'), {
		to: 'arrow_left',
		tooltip: bbb.tooltip('coucou', 'top')
	});
	bbb.add('arrow_top', () => console.log('function 3'));

	const styleyy = {
		background: 'var(--b2)',
		width: '100px',
		height: '100px'
	};

	//////////////////////////

	let selectedButton1 = $state('arrow_right');

	let animeDurationButton1 = $state(100);

	function changeActualState() {
		selectedButton1 = 'arrow_top';
	}

	function changeDuration() {
		animeDurationButton1 = 2000;
	}

	/**
	 *Doc:
	 * @notice This will trigger when the parent change the name button
	 * @param {string} selected - Must be a valid icoGlyph name and being in the button	* can be used to bind the selected prop of IcoGlyphButton
	 * Thus you can change the button state from anywhere in the app
	 * Ex: if the state button depend of a boolean in the parent component
	 * bind:selected={...}
	 */

	$inspect(1 / psi ** 4);
</script>

<main>
	<div id="justforspace"></div>
	<IcoGlyphButton
		bind:selected={selectedButton1}
		animeDuration={animeDurationButton1}
		buttonConfig={bbb}
		buttonStyle={styleyy}
	/>
	<button class="text-button" onclick={changeActualState}>arrow_left</button>
	<button class="text-button" onclick={changeDuration}>duration</button>
</main>

<style>
	main {
		margin-left: 15px;
	}

	#justforspace {
		height: 100px;
	}
</style>
