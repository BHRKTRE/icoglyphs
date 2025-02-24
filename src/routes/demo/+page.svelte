<script>
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

	icoGlyphButtonPropsConstructor.add(
		'arrow_right',
		() => {
			console.log('function 1');
		},
		{ to: 'arrow_left', duration: 1000 }
	);

	icoGlyphButtonPropsConstructor.add(
		'arrow_left',
		() => {
			console.log('function 2');
		},
		{ to: 'arrow_top' }
	);

	icoGlyphButtonPropsConstructor.add('arrow_top', () => {
		console.log('function 3');
	});
	// const propsOfIcoGlyphButton = icoGlyphButtonPropsConstructor.props;

	// $inspect(icoGlyphButtonPropsConstructor.props);

	//////////////////////////

	let propsOfIcoGlyphButton = $state({
		arrow_right: {
			onClickFunction: () => {
				console.log('function 1');
			},
			changeStateOnClick: {
				to: 'arrow_left',
				duration: 1000
			},
			changeStateOnVarTrue: {
				animeOnTrue: false,
				to: 'arrow_top',
				// Correct this function
				goForAnime: () => {
					this.animeOnTrue = false;
				}
			}
		},
		arrow_left: {
			onClickFunction: () => {
				console.log('function 2');
			},
			changeStateOnClick: {
				to: 'arrow_top'
			}
		},
		arrow_top: {
			onClickFunction: () => {
				console.log('function 3');
			}
		}
	});

	// var for anime
	function varBool() {
		propsOfIcoGlyphButton.arrow_right.changeStateOnVarTrue.animeOnTrue =
			!propsOfIcoGlyphButton.arrow_right.changeStateOnVarTrue.animeOnTrue;
	}

	// $inspect(fooVar);
</script>

<main>
	<IcoGlyphButton {...propsOfIcoGlyphButton} />
	<button onclick={varBool}>var change</button>
</main>
