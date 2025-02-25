<script>
	import icoGlyphs from '$lib/index.js';
	import anime from 'animejs';

	let { selected = $bindable(), ...propsOfIcoGlyphButton } = $props();
	const uid = $props.id();

	let currentStates = $state(Object.keys(propsOfIcoGlyphButton.buttonStates)[0]);
	let isAnimating = $state(false);

	// function to be executed when the button is clicked + start animation if .to is defined
	function onClickFunction() {
		propsOfIcoGlyphButton.buttonStates[currentStates].onClickFunction();
		if (propsOfIcoGlyphButton.buttonStates[currentStates].to) {
			changeStateFunction(propsOfIcoGlyphButton.buttonStates[currentStates].to);
		}
	}

	// change state and start animation
	function changeStateFunction(changeName) {
		if (isAnimating) return;
		isAnimating = true;

		let nextState = changeName;
		let animeDuration = propsOfIcoGlyphButton.animeDuration
			? propsOfIcoGlyphButton.animeDuration
			: 500;

		anime({
			targets: `#${uid}`,
			d: icoGlyphs.getPath(nextState),
			direction: 'normal',
			easing: 'easeInOutQuad',
			duration: animeDuration,
			complete: function () {
				selected = nextState;
				currentStates = nextState;
				isAnimating = false;
			}
		});
	}

	// animation if selected is different from currentStates
	$effect(() => {
		if (currentStates !== selected && !isAnimating) {
			if (!Object.keys(propsOfIcoGlyphButton.buttonStates).includes(selected)) {
				console.error(
					`Error: The state "${selected}" does not exist. 
					 Available states are: ${Object.keys(propsOfIcoGlyphButton.buttonStates).join(', ')}`
				);
			} else {
				changeStateFunction(propsOfIcoGlyphButton.selected);
			}
		}
	});

	// $inspect(isAnimating);
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
