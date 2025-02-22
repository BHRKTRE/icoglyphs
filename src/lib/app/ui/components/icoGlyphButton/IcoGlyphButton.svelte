<script>
	import icoGlyphs from '$lib/index.js';
	import anime from 'animejs';

	let { ...propsOfIcoGlyphButton } = $props();
	const uid = $props.id();

	let currentStates = $state(Object.keys(propsOfIcoGlyphButton)[0]);

	// FIX : improve this if anime dont exist
	let nextState = $derived(propsOfIcoGlyphButton[currentStates].anime.to);
	let animeDuration = $derived(
		propsOfIcoGlyphButton[currentStates].anime.duration
			? propsOfIcoGlyphButton[currentStates].anime.duration
			: 500
	);

	// ADD : anime if something change

	// FIX : Need fix if user spam click
	function changeState() {
		if (propsOfIcoGlyphButton[currentStates].anime) {
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

	// $inspect(propsOfIcoGlyphButton);
</script>

<button
	onclick={(propsOfIcoGlyphButton[currentStates].onClickFunction(), changeState)}
	aria-label="a faire"
	class="internal-icoglyph-button"
>
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
