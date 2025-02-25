<script>
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

	let bbb = $state(new icoGlyphButtonPropsConstructor());
	bbb.add('arrow_left', () => console.log('function 2'), 'arrow_top');
	bbb.add('arrow_right', () => console.log('function 1'), 'arrow_left');
	bbb.add('arrow_top', () => console.log('function 3'));

	//////////////////////////

	// let selectedButton1 = $state('arrow_right');

	let animeDurationButton1 = $state(100);

	let propsOfIcoGlyphButton1 = {
		arrow_right: {
			onClickFunction: () => {
				console.log('function 1');
			},
			to: 'arrow_left'
		},
		arrow_left: {
			onClickFunction: () => {
				console.log('function 2');
			},
			to: 'arrow_top'
		},
		arrow_top: {
			onClickFunction: () => {
				console.log('function 3');
			}
		}
	};

	function changeActualState() {
		selectedButton1 = 'arrow_top';
	}

	function changeDuration() {
		animeDurationButton1 = 2000;
	}

	$inspect(bbb);

	/**
	 *Doc:
	 * @param {string} selected - Must be a valid icoGlyph name and being in the button	* can be used to bind the selected prop of IcoGlyphButton
	 * Thus you can change the button state from anywhere in the app
	 * Ex: if the state button depend of a boolean in the parent component
	 * bind:selected={...}
	 */

	//bind:selected={selectedButton1}
</script>

<main>
	<IcoGlyphButton animeDuration={animeDurationButton1} buttonConfig={bbb} />
	<button class="text-button" onclick={changeActualState}>arrow_left</button>
	<button class="text-button" onclick={changeDuration}>duration</button>
</main>
