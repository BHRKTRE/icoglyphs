<script>
	/**
	 * @title Tooltip Component
	 * @dev Displays a tooltip with configurable text, position, and spacing.
	 * @notice This component is used to show a tooltip with a specified message when hovering over a button.
	 * @notice You can configure the text, location, and spacing of the tooltip.
	 *
	 * @param {string} tooltipsText - The text to display inside the tooltip. Default is 'coucou'.
	 * @param {string} tooltipLocation - The position of the tooltip relative to the button.
	 *                                   Valid values: 'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'right'.
	 * @param {string} tooltipsSpaceBetween - The space between the tooltip and the button. Default is '10px'.
	 * @param {boolean} buttonIsOver - Automatically passed from the IcoGlyphButton component.
	 *                                  Controls the visibility of the tooltip when `true`.
	 */

	let {
		tooltipsText = 'coucou',
		tooltipLocation = 'top',
		tooltipsSpaceBetween = '10px',
		buttonIsOver = false
	} = $props();

	/**
	 * @notice Defines the spacing between the tooltip and the button.
	 * @dev Uses a `calc(100% + Xpx)` formula to dynamically compute the spacing between the tooltip and the button.
	 * @return {string} A CSS-compatible string defining the space between the tooltip and button.
	 */
	let spaceBetweenSetup = `calc(100% + ${tooltipsSpaceBetween})`;

	/**
	 * @notice Computes the CSS property that determines where the tooltip is positioned.
	 * @dev Uses a derived store to map `tooltipLocation` to a CSS placement property.
	 * @return {string} The CSS property (`top`, `bottom`, `left`, or `right`).
	 */
	let spaceBetweenLocation = $derived.by(() => {
		switch (tooltipLocation) {
			case 'top':
			case 'top-left':
			case 'top-right':
				return `bottom`;

			case 'bottom':
			case 'bottom-left':
			case 'bottom-right':
				return `top`;

			case 'right':
				return `left`;

			case 'left':
				return `right`;
		}
	});
</script>

<span
	class="tooltip {tooltipLocation}"
	class:buttonIsOver
	style="{spaceBetweenLocation}:{spaceBetweenSetup};">{tooltipsText}</span
>

<style>
	span {
		color: var(--t1);
		text-align: center;
		user-select: none;
		pointer-events: none;
	}

	.tooltip {
		visibility: hidden;
		opacity: 0;

		background-color: var(--b1);
		text-align: center;
		padding: var(--spacing-small) var(--spacing-medium);
		border-radius: var(--border-radius);

		transition: opacity 1s;

		white-space: nowrap;
		position: absolute;
		z-index: 1;
	}

	.buttonIsOver {
		visibility: visible;
		opacity: 1;
	}

	.top {
		transform: translateX(-50%);

		left: 50%;
	}
	.top-left {
		transform: translateX(-100%);
		border-radius: var(--border-radius) var(--border-radius) 0 var(--border-radius);

		left: 50%;
	}
	.top-right {
		transform: translateX(100%);
		border-radius: var(--border-radius) var(--border-radius) var(--border-radius) 0;

		right: 50%;
	}
	.bottom {
		transform: translateX(-50%);

		left: 50%;
	}
	.bottom-left {
		transform: translateX(-100%);
		border-radius: var(--border-radius) 0px var(--border-radius) var(--border-radius);

		left: 50%;
	}
	.bottom-right {
		transform: translateX(100%);
		border-radius: 0px var(--border-radius) var(--border-radius) var(--border-radius);

		right: 50%;
	}
	.left {
		top: 50%;
		transform: translateY(-50%);
	}
	.right {
		top: 50%;
		transform: translateY(-50%);
	}

	/* Arrow */
	/* .top::after {
		content: ' ';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: var(--b1o3) transparent transparent transparent;
	}

	.bottom::after {
		content: ' ';
		position: absolute;
		bottom: 100%;
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent var(--b1o3) transparent;
	}
	.right::after {
		content: ' ';
		position: absolute;
		top: 50%;
		left: 100%;
		margin-top: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent transparent var(--b1o3);
	}
	.left::after {
		content: ' ';
		position: absolute;
		top: 50%;
		right: 100%;
		margin-top: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent var(--b1o3) transparent transparent;
	} */

	/*  */

	/* .top-left::after {
		content: ' ';
		position: absolute;
		top: 100%; 
		right: 1.3%;
		margin-left: -5px;
		border-width: 3px;
		border-style: solid;
		border-color: var(--b1o3) var(--b1o3) transparent transparent;
	} */
</style>
