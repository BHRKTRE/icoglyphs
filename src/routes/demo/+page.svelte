<script>
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import propsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

	function hello() {
		console.log('hello');
	}

	const props = {
		props: {
			state1: {
				icoGlyphName: 'arrow_right',
				onClickFunction: () => {
					console.log('function 1');
				},
				to: 'state2'
			},
			state2: {
				icoGlyphName: 'arrow_left',
				onClickFunction: () => {
					console.log('function 2');
				},
				to: 'state3'
			},
			state3: {
				icoGlyphName: 'arrow_top',
				onClickFunction: () => {
					console.log('function 3');
				},
				to: 'state1'
			}
		}
	};

	// $inspect(props);
</script>

<main>
	<IcoGlyphButton {...props} />
</main>
