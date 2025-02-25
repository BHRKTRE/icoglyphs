/**
 * Class representing the constructor for icoGlyphButtonProps.
 */
class IcoGlyphButtonPropsConstructor {
	/**
	 * Creates an instance of IcoGlyphButtonPropsConstructor.
	 * Initializes an empty collection of button states.
	 *
	 * @param {number} [animeDuration=500] - The default animation duration.
	 */
	constructor(animeDuration = 500) {
		this.selected = null; // Pas d'état sélectionné initialement
		this.animeDuration = animeDuration;
		this.buttonStates = {};
	}

	/**
	 * Adds a new button icon with an optional animation to the props collection.
	 *
	 * @param {string} name - The name of the icon (e.g., 'arrow_right').
	 * @param {Function} onClickFunction - The function to be executed when the button is clicked.
	 * @param {Object} [anime={}] - An optional animation object containing properties like 'to'.
	 * @param {string} [anime.to] - The target icon name for animation (e.g., 'arrow_left').
	 */
	add(name, onClickFunction, anime = {}) {
		if (!this.selected) {
			// Si c'est le premier état ajouté, on l'assigne comme état sélectionné par défaut
			this.selected = name;
		}

		this.buttonStates[name] = {
			onClickFunction,
			...(anime.to ? { to: anime.to } : {}) // Ajoute uniquement si `to` est défini
		};
	}

	/**
	 * Sets the currently selected button state.
	 * @param {string} name - The name of the state to set as selected.
	 */
	setSelected(name) {
		if (this.buttonStates[name]) {
			this.selected = name;
		} else {
			console.error(`Error: The state "${name}" does not exist.`);
		}
	}

	/**
	 * Returns the props object formatted for IcoGlyphButton.
	 * Ensures that a selected state always exists before returning.
	 * @returns {Object} Props object ready for the Svelte component.
	 */
	getProps() {
		// Si aucun état n'a été ajouté, on lève une erreur
		if (!this.selected) {
			console.error('Error: No states have been added to the button.');
			return null;
		}

		return {
			selected: this.selected,
			animeDuration: this.animeDuration,
			buttonStates: this.buttonStates
		};
	}
}

export default IcoGlyphButtonPropsConstructor;
