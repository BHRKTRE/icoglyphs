<script>
	import icoGlyphs from '$lib/index.js';
	import Tooltip from '$lib/app/ui/components/icoGlyphButton/Tooltip.svelte';
	import anime from 'animejs';

	let { selected = $bindable(), animeDuration = 500, buttonConfig } = $props();
	const uid = $props.id();

	let state = $state(selected || Object.keys(buttonConfig)[0]);
	let isAnimating = $state(false);

	function onClickFunction() {
		buttonConfig[state].onClickFunction();
		if (buttonConfig[state].to) {
			transitionState(buttonConfig[state].to);
		}
	}

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
				state = newState;
				isAnimating = false;
			}
		});
	}

	$effect(() => {
		if (typeof selected !== 'undefined' && state !== selected && !isAnimating) {
			transitionState(selected);
		}
	});

	let buttonIsOver = $state(false);

	$inspect(buttonConfig[state].tooltip);
</script>

<button
	onmouseenter={() => (buttonIsOver = true)}
	onmouseleave={() => (buttonIsOver = false)}
	onclick={onClickFunction}
	aria-label="a faire"
	class="internal-icoglyph-button"
>
	{#if buttonConfig[state].tooltip}
		<Tooltip {...buttonConfig[state].tooltip} {buttonIsOver} />
	{/if}
	<svg {...icoGlyphs.getSvgAttributes(state)}>
		<path id={uid} d={icoGlyphs.getPath(state)} />
	</svg>
</button>

<style>
	button {
		position: relative;

		width: 50px;
		height: 50px;
	}
</style>
