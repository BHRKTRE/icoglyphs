<script>
	import icoGlyphs from '$lib/icoglyphs.js';
	import { animate } from 'animejs';

	// Using morphTo() from animejs ?
	// Using more this component
	// https://animejs.com/documentation/svg/morphto

	let { IGName = $bindable(), animeDuration = 500 } = $props();
	let isAnimating = $state(false);
	const uid = $props.id();

	let currentPath = $state(icoGlyphs.getPath(IGName));

	/**
	 * @dev Enables external control over the button state, allowing updates from a parent component.
	 * @notice Must be a bindable property.
	 */
	$effect(() => {
		if (typeof IGName !== 'undefined' && !isAnimating) {
			const newPath = icoGlyphs.getPath(IGName);
			if (newPath !== currentPath) {
				transitionState(newPath);
			}
		}
	});

	/**
	 * @notice Transitions the button to a new state with an animation.
	 * @dev Ensures the new state exists in `buttonConfig` before transitioning.
	 *
	 * @param {string} newState The target state to transition to.
	 * @return {void}
	 */
	function transitionState(newPath) {
		if (isAnimating) return;
		isAnimating = true;

		animate(`#${uid}`, {
			d: newPath,
			direction: 'normal',
			ease: 'easeInOutQuad',
			duration: animeDuration,
			complete: () => {
				currentPath = newPath;
				isAnimating = false;
			}
		});
	}
</script>

<path id={uid} d={currentPath}></path>
