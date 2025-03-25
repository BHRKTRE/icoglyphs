<script>
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import psi from '$lib/app/ui/utils/psi.js';

	let bbb = $state(new icoGlyphButtonPropsConstructor());
	bbb.add('arrow-left', () => console.log('function 2'), {
		to: 'arrow-right',
		// tooltip: bbb.tooltip('a faire', 'bottom'),
		text: 'Prends le bail'
	});
	bbb.add('arrow-right', () => console.log('function 1'), {
		// tooltip: bbb.tooltip('coucou', 'top'),
		text: '.png'
	});
	// bbb.add('arrow-top', () => console.log('function 3'));

	const styleyy = {
		// background: 'var(--b2)',
		// width: '100px',
		// height: '100px'
	};

	//////////////////////////

	let selectedButton1 = $state('arrow-left');

	function changeActualState() {
		selectedButton1 = 'arrow-right';
	}

	let animeDurationButton1 = $state(500);

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

	// $inspect(appState.modes);
</script>

<main>
	<div id="justforspace"></div>
	<IcoGlyphButton
		bind:selected={selectedButton1}
		animeDuration={animeDurationButton1}
		buttonConfig={bbb}
		buttonStyle={styleyy}
	/>
	<br />
	<br />
	<button class="text-button" onclick={changeActualState}>arrow_left</button>
	<button class="text-button" onclick={changeDuration}>duration</button>
	<!-- <button class="text-button" onclick={changeDuration}>params</button>

	<div id="params-container"><Params /></div> -->
</main>

<style>
	/* #params-container {
		border: 1px solid var(--b2);
		position: absolute;
		background: var(--b1);
		top: 10px;
	} */
	main {
		margin-left: 15px;
	}

	#justforspace {
		height: 100px;
	}
</style>
