/**
 * Class for configuring `IcoGlyphButton` props.
 * Each instance represents multiple button states and their transitions.
 */
class IcoGlyphButtonPropsConstructor {
	/**
	 * Creates an object for tooltip options based on provided parameters.
	 *
	 * @param {string} tooltipsText - The text to display in the tooltip.
	 * @param {string} [tooltipLocation] - (Optional) The position of the tooltip (e.g., 'top', 'bottom', 'left', 'right').
	 * @param {string} [tooltipsSpaceBetween] - (Optional) The space between the button and the tooltip.
	 * @returns {Object} The object containing tooltip options.
	 */
	tooltip(tooltipsText, tooltipLocation, tooltipsSpaceBetween) {
		let tooltipOptions = { tooltipsText };

		// Only add position and space if they are provided
		if (tooltipLocation) tooltipOptions.tooltipLocation = tooltipLocation;
		if (tooltipsSpaceBetween) tooltipOptions.tooltipsSpaceBetween = tooltipsSpaceBetween;

		return tooltipOptions;
	}

	/**
	 * Adds a new button state with an associated function and optional properties.
	 *
	 * @param {string} name - The name of the button state (e.g., `'arrow_right'`).
	 * @param {Function} onClickFunction - The function executed when the button is clicked.
	 * @param {Object} options - Optional additional properties such as `to`, `tooltip`, etc.
	 */
	add(name, onClickFunction, options = {}) {
		this[name] = {
			onClickFunction,
			...options // Add any provided options dynamically
		};
	}
}

export default IcoGlyphButtonPropsConstructor;

// Usage
// let buttonName = $state(new icoGlyphButtonPropsConstructor());
// buttonName.add('arrow_left', () => console.log('function 2'), {
// 	to: 'arrow_top',
// 	tooltip: buttonName.tooltip('a faire', 'bottom')
// });
