import { applySvgUserStyles } from '$lib/design/applySvgUserStyles.svelte.js';

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
 * Psi ratio
 */
const a = 1 / 2;
const b = Math.sqrt(69) / 18;

const term1 = Math.cbrt(a + b);
const term2 = Math.cbrt(a - b);

const psiValue = term1 + term2;

// 1.3247179572447458
const psi = psiValue;

/**
 * Changes the color mode of the application and persists the selection in localStorage.
 *
 * @param {string} color - The name of the selected color mode (must be : "light", "dark", "grey").
 */
const changeColorMode = (color) => {
	// Save the selected color mode to localStorage for persistence.
	localStorage.setItem('colorMode', JSON.stringify(color));

	// Apply the selected color mode to the document body attribute.
	document.body.setAttribute('data-color-mode', color);
	applySvgUserStyles();
};

/**
 * IcoGlyphs User Custom Style
 *
 */
let icoGlyphUserCustomStyles = $state({});

/**
 * Global application state object.
 *
 * @typedef {Object} GlobalVar
 * @property {Object} showPrivateIcoGlyph - Contains the state and related methods for `showPrivateIcoGlyph`.
 * @property {boolean} showPrivateIcoGlyph.value - Indicates whether "private icoGlyph" mode is enabled.
 * @property {Function} showPrivateIcoGlyph.togglePrivateIcoGlyph - Toggles the value of `showPrivateIcoGlyph`.
 * @property {Object} colorMode - Contains the method to change the application's color mode.
 * @property {Function} colorMode.changeColorMode - Updates the color mode and stores the preference.
 *    Possible values: 'grey' (default), 'dark', 'light'.
 * @property {object} icoGlyphUserSettings
 * * @property {object} style
 * @property {number} Psi value
 */
let globalVar = $state({
	showPrivateIcoGlyph: {
		value: showPrivateIcoGlyphValue,
		togglePrivateIcoGlyph: togglePrivateIcoGlyph
	},
	colorMode: {
		// The initial value could be retrieved from localStorage if needed.
		// value: 'grey',
		changeColorMode: changeColorMode
	},
	icoGlyphUserSettings: {
		style: icoGlyphUserCustomStyles
	},
	psi: psi
});

// Export the global state so it can be used across the application.
export default globalVar;
