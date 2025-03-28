<script>
	import icoGlyphs from '$lib/index.js';
	import anime from 'animejs';

	let { IGName = $bindable(), animeDuration = 500 } = $props();
	let isAnimating = $state(false);
	const uid = $props.id();

	/**
	 * @notice Transitions the button to a new state with an animation.
	 * @dev Ensures the new state exists in `buttonConfig` before transitioning.
	 *
	 * @param {string} newState The target state to transition to.
	 * @return {void}
	 */
	function transitionState(newState) {
		if (isAnimating) return;
		isAnimating = true;

		anime({
			targets: `#${uid}`,
			d: icoGlyphs.getPath(newState),
			direction: 'normal',
			easing: 'easeInOutQuad',
			duration: animeDuration,
			complete: () => {
				isAnimating = false;
			}
		});
	}

	/**
	 * @dev Enables external control over the button state, allowing updates from a parent component.
	 * @notice Must be a bindable property.
	 */
	$effect(() => {
		if (typeof IGName !== 'undefined' && !isAnimating) {
			transitionState(IGName);
		}
	});
</script>

<path id={uid} d={icoGlyphs.getPath(IGName)}></path>
