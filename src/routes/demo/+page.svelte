<script>
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import propsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';

	function hello() {
		console.log('hello');
	}

	const props = {
		props: {
			arrow_right: {
				onClickFunction: () => {
					console.log('function 1');
				},
				anime: {
					to: 'arrow_left',
					duration: 1000
				}
			},
			arrow_left: {
				onClickFunction: () => {
					console.log('function 2');
				},
				anime: { to: 'arrow_top' }
			},
			arrow_top: {
				onClickFunction: () => {
					console.log('function 3');
				}
				// anime: { to: 'arrow_right' }
			}
		}
	};

	// $inspect(props);
</script>

<main>
	<IcoGlyphButton {...props} />
</main>
