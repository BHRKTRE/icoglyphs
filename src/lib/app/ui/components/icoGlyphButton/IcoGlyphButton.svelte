<script>
	import icoGlyphs from '$lib/index.js';
	import anime from 'animejs';

	let { ...propsOfIcoGlyphButton } = $props();
	const uid = $props.id();

	let currentStates = $state(Object.keys(propsOfIcoGlyphButton)[0]);

	function onClickFunction() {
		propsOfIcoGlyphButton[currentStates].onClickFunction();
		if (propsOfIcoGlyphButton[currentStates].changeStateOnClick) {
			changeStateFunction('changeStateOnClick');
		}
	}

	// ADD : anime if something change

	// FIX : Need fix if user spam click
	function changeStateFunction(changeType) {
		// FIX : improve this if anime dont exist

		let nextState = propsOfIcoGlyphButton[currentStates][changeType].to;
		let animeDuration = propsOfIcoGlyphButton[currentStates][changeType].duration
			? propsOfIcoGlyphButton[currentStates][changeType].duration
			: 500;
		if (propsOfIcoGlyphButton[currentStates][changeType]) {
			anime({
				targets: `#${uid}`,
				d: icoGlyphs.getPath(nextState),
				direction: 'normal',
				easing: 'easeInOutQuad',
				duration: animeDuration,
				complete: function () {
					currentStates = nextState;
				}
			});
		}
	}

	//////////////////////////////

	$effect(() => {
		if (propsOfIcoGlyphButton[currentStates]?.changeStateOnVarTrue) {
			if (propsOfIcoGlyphButton[currentStates].changeStateOnVarTrue.animeOnTrue == true) {
				changeStateFunction('changeStateOnVarTrue');
			} else {
				// console.log('var is false');
			}
		}
	});

	// $inspect(fooVar);
</script>

<button onclick={onClickFunction} aria-label="a faire" class="internal-icoglyph-button">
	<svg {...icoGlyphs.getSvgAttributes(currentStates)}>
		<path id={uid} d={icoGlyphs.getPath(currentStates)} />
	</svg>
</button>

<style>
	button {
		width: 50px;
		height: 50px;
	}
</style>
