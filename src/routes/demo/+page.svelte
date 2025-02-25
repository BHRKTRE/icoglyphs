<script>
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

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

	// $inspect(fooVar);
</script>

<main>
	<IcoGlyphButton bind:selected={propsOfIcoGlyphButton.selected} {...propsOfIcoGlyphButton} />
	<button onclick={changeActualState}>arrow_left</button>
</main>
