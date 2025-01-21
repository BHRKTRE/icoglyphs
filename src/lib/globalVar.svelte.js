/**
 * Retrieves the initial value of `showPrivateIcoGlyph` from localStorage.
 * If the key doesn't exist or the code is executed server-side, defaults to `false`.
 *
 * @type {boolean} Boolean value indicating whether "private ico glyph" mode is enabled.
 */
const showPrivateIcoGlyphValue =
	typeof window !== 'undefined' && localStorage.getItem('showPrivateIcoGlyph')
		? JSON.parse(localStorage.getItem('showPrivateIcoGlyph'))
		: false;

/**
 * Toggles the value of `showPrivateIcoGlyph` in the global state
 * and updates it in localStorage for persistence.
 */
const togglePrivateIcoGlyph = () => {
	// Flip the current value of `showPrivateIcoGlyph`.
	globalVar.showPrivateIcoGlyph.value = !globalVar.showPrivateIcoGlyph.value;

	// Save the updated value to localStorage.
	localStorage.setItem('showPrivateIcoGlyph', JSON.stringify(globalVar.showPrivateIcoGlyph.value));
};

/**
 * @typedef {Object} GlobalVar
 * @property {Object} showPrivateIcoGlyph - Contains the state and related methods for `showPrivateIcoGlyph`.
 * @property {boolean} showPrivateIcoGlyph.value - Indicates whether "private icoGlyph" mode is enabled.
 * @property {Function} showPrivateIcoGlyph.togglePrivateIcoGlyph - Toggles the value of `showPrivateIcoGlyph`.
 */
let globalVar = $state({
	showPrivateIcoGlyph: {
		value: showPrivateIcoGlyphValue,
		togglePrivateIcoGlyph: togglePrivateIcoGlyph
	}
});

// Export the global state so it can be used across the application.
export default globalVar;
