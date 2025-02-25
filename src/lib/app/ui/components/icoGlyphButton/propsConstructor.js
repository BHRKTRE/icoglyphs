/**
 * Class for configuring `IcoGlyphButton` props.
 * Each instance represents multiple button states and their transitions.
 */
class IcoGlyphButtonPropsConstructor {
	/**
	 * Adds a new button state with an associated function and an optional transition.
	 *
	 * @param {string} name - The name of the button state (e.g., `'arrow_right'`).
	 * @param {Function} onClickFunction - Function executed when the button is clicked.
	 * @param {string} [to] - (Optional) The target state to transition to (e.g., `'arrow_left'`).
	 */
	add(name, onClickFunction, to) {
		this[name] = {
			onClickFunction,
			...(to ? { to } : {}) // Ajoute `to` uniquement s'il est défini
		};
	}
}

export default IcoGlyphButtonPropsConstructor;
