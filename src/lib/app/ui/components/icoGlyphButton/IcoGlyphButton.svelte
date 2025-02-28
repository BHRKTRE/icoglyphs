<script>
	import icoGlyphs from '$lib/index.js';
	import Tooltip from '$lib/app/ui/components/icoGlyphButton/Tooltip.svelte';
	import anime from 'animejs';

	/**
	 * @title IcoGlyphButton Component
	 * @author L
	 * @notice A customizable button component that supports animated transitions.
	 *
	 * @dev The `propsConstructor.js` file in the same directory can be used to configure `buttonConfig`.
	 *
	 * @param {string} [selected] (optional) A valid icoGlyph name that must exist in `buttonConfig`.
	 * @param {number} [animeDuration=500] (optional) The animation duration in milliseconds.
	 * @param {object} buttonConfig The main data structure defining button states and behaviors.
	 * @param {object} [buttonStyle] (optional) Custom styles for the button.
	 *
	 * @example
	 * <IcoGlyphButton
	 *   bind:selected={selectedButtonVar}
	 *   animeDuration={animeDurationButtonVar}
	 *   buttonConfig={buttonConfigVar}
	 *   buttonStyle={buttonStyleVar}
	 * />
	 *
	 */

	let { selected = $bindable(), animeDuration = 500, buttonConfig, buttonStyle } = $props();
	const uid = $props.id();
	let currentState = $state(selected || Object.keys(buttonConfig)[0]);
	let isAnimating = $state(false);
	let buttonIsOver = $state(false);

	/**
	 * @notice Transitions the button to a new state with an animation.
	 * @dev Ensures the new state exists in `buttonConfig` before transitioning.
	 *
	 * @param {string} newState The target state to transition to.
	 * @return {void}
	 * @error Logs an error if `newState` is not defined in `buttonConfig`.
	 */
	function transitionState(newState) {
		if (!Object.keys(buttonConfig).includes(newState)) {
			console.error(
				`Error: The state "${newState}" does not exist in this button.
				Available states are: ${Object.keys(buttonConfig).join(', ')}`
			);
			return;
		}

		if (isAnimating) return;
		isAnimating = true;

		anime({
			targets: `#${uid}`,
			d: icoGlyphs.getPath(newState),
			direction: 'normal',
			easing: 'easeInOutQuad',
			duration: animeDuration,
			complete: () => {
				selected = newState;
				currentState = newState;
				isAnimating = false;
			}
		});
	}

	/**
	 * @notice Handles button click events.
	 * @dev Executes the onClickFunction of the current state and transitions if a `to` state is defined.
	 *
	 * @return {void}
	 */
	function onClickFunction() {
		buttonConfig[currentState].onClickFunction();
		if (buttonConfig[currentState].to) {
			transitionState(buttonConfig[currentState].to);
		}
	}

	/**
	 * @notice Monitors changes to the `selected` prop and updates the button state accordingly.
	 * @dev Enables external control over the button state, allowing updates from a parent component.
	 *
	 * @param {string} selected A valid icoGlyph name present in `buttonConfig`.
	 * @notice Must be a bindable property.
	 */
	$effect(() => {
		if (typeof selected !== 'undefined' && currentState !== selected && !isAnimating) {
			transitionState(selected);
		}
	});

	/**
	 * @notice Generates inline styles for the button based on the `buttonStyle` prop.
	 * @dev Converts the style object into a CSS string.
	 *
	 * @param {object} buttonStyle A key-value object defining CSS styles.
	 * @return {string} A string representation of inline styles.
	 */

	const style = buttonStyle
		? Object.entries(buttonStyle)
				.map(([key, value]) => `${key}: ${value}`)
				.join('; ')
		: '';

	// Consider adding an aria-label for accessibility

	// $inspect(style);
</script>

<button
	onmouseenter={() => (buttonIsOver = true)}
	onmouseleave={() => (buttonIsOver = false)}
	onclick={onClickFunction}
	class="internal-icoglyph-button"
	{style}
>
	{#if buttonConfig[currentState].tooltip}
		<Tooltip {...buttonConfig[currentState].tooltip} {buttonIsOver} />
	{/if}
	<svg {...icoGlyphs.getSvgAttributes(currentState)}>
		<path id={uid} d={icoGlyphs.getPath(currentState)} />
	</svg>
</button>

<style>
	button {
		position: relative;

		width: 50px;
		height: 50px;
	}
</style>
