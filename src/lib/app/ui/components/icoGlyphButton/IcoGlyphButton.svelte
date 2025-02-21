<script>
	import icoGlyphs from '$lib/index.js';
	import anime from 'animejs';

	let { props } = $props();

	let currentStates = $state('state1');

	// add id with const uid = $props.id();
	function generateRandomId() {
		return 'path' + '-' + Math.random().toString(36).substring(2, 9);
	}
	const pathId = generateRandomId();

	const animeDuration = 500;

	let nextState = $derived(props[currentStates].to);

	function changeState() {
		const nextStateObj = props[nextState];
		const pathOfNextState = icoGlyphs.getPath(nextStateObj.icoGlyphName);

		anime({
			targets: `#${pathId}`,
			d: pathOfNextState,
			direction: 'normal',
			easing: 'easeInOutQuad',
			duration: animeDuration,
			complete: function () {
				currentStates = nextState;
			}
		});
	}

	// $inspect(nextState);
</script>

<button
	onclick={(props[currentStates].onClickFunction(), changeState)}
	aria-label="a faire"
	class="internal-icoglyph-button"
>
	<svg {...icoGlyphs.getSvgAttributes(props[currentStates].icoGlyphName)}>
		<path id={pathId} d={icoGlyphs.getPath(props[currentStates].icoGlyphName)} />
	</svg>
</button>

<style>
	button {
		width: 50px;
		height: 50px;
	}
</style>
