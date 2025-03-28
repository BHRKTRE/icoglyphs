/**
 * @title Class for configuring '' props.
 * Each instance stores multiple button states and defines their behavior, including transitions and tooltips
 */
class IcoGlyphButtonPropsConstructor {
	/**
	 * Creates an object for tooltip options based on provided parameters.
	 *
	 * @param {string} tooltipsText - The text to display in the tooltip.
	 * @param {string} [tooltipLocation] - (Optional) The position of the tooltip (e.g., 'top', 'bottom', 'left', 'right').
	 * @param {string} [tooltipsSpaceBetween] - (Optional) The space between the button and the tooltip.
	 * @returns {object} The object containing tooltip options.
	 *
	 * @example
	 * let buttonNameExample = $state(new icoGlyphButtonPropsConstructor());
	 * buttonNameExample.add('arrow_left', () => fooFunction(), {
	 * 	to: 'arrow_top',
	 * 	tooltip: buttonNameExample.tooltip('tooltip text', 'bottom')
	 * });
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
	 * @param {function} onClickFunction - The function executed when the button is clicked.
	 * @param {object} options - Optional additional properties such as `to`, `tooltip`, etc.
	 * @return {void} This method does not return anything. It modifies the current state by adding a new entry.
	 */
	add(name, onClickFunction, options = {}) {
		this[name] = {
			onClickFunction,
			...options // Add any provided options dynamically
		};
	}
}

export default IcoGlyphButtonPropsConstructor;
