/**
 * Class representing the constructor for icoGlyphButtonProps.
 */
class icoGlyphButtonPropsConstructor {
	/**
	 * Creates an instance of icoGlyphButtonPropsConstructor.
	 * Initializes the props object to hold button properties.
	 */
	constructor() {
		this.props = {};
	}

	/**
	 * Adds a new button icon with an optional animation to the props collection.
	 *
	 * @param {string} name - The name of the icon (e.g., 'arrow_right').
	 * @param {Function} onClickFunction - The function to be executed when the button is clicked.
	 * @param {Object|null} [anime=null] - An optional animation object containing properties like 'to' and 'duration'.
	 * @param {string} [anime.to] - The target icon name for animation (e.g., 'arrow_left').
	 * @param {number} [anime.duration] - The duration of the animation in milliseconds.
	 */
	add(name, onClickFunction, anime = null) {
		const newIcon = {
			onClickFunction: onClickFunction
		};

		if (anime) {
			newIcon.anime = anime;
		}

		this.props[name] = newIcon;
	}
}

// Create an instance of icoGlyphButtonPropsConstructor
const icoGlyphButtonProps = new icoGlyphButtonPropsConstructor();
export default icoGlyphButtonProps;
