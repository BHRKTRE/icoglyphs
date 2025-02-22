<script>
	import icoGlyphs from '$lib/index.js';
	import anime from 'animejs';

	let { props } = $props();
	const uid = $props.id();

	let currentStates = $state(Object.keys(props)[0]);

	let nextState = $derived(props[currentStates].anime.to);
	let animeDuration = $derived(
		props[currentStates].anime.duration ? props[currentStates].anime.duration : 500
	);

	function changeState() {
		if (props[currentStates].anime) {
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

	// $inspect(nextState);
</script>

<button
	onclick={(props[currentStates].onClickFunction(), changeState)}
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
