<script>
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

	let bbb = $state(new icoGlyphButtonPropsConstructor());
	bbb.add('arrow_left', () => console.log('function 2'), { to: 'arrow_right' });
	bbb.add('arrow_right', () => console.log('function 2'));

	//////////////////////////

	let icoSelected = $state('arrow_right');

	let propsOfIcoGlyphButton = $state({
		selected: 'arrow_right',
		animeDuration: 1000,
		buttonStates: {
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
		}
	});

	function changeActualState() {
		propsOfIcoGlyphButton.selected = 'arrow_top';
	}

	// make animeDuration optional
	$inspect(propsOfIcoGlyphButton);
</script>

<main>
	<IcoGlyphButton bind:selected={propsOfIcoGlyphButton.selected} {...propsOfIcoGlyphButton} />
	<button onclick={changeActualState}>arrow_left</button>
</main>
