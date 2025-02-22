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

	const propsOfIcoGlyphButton = icoGlyphButtonPropsConstructor.props;
</script>

<main>
	<IcoGlyphButton {...propsOfIcoGlyphButton} />
</main>
