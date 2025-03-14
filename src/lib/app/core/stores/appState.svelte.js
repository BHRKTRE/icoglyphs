import { applySvgUserStyles } from '$lib/app/core/utils/applySvgUserStyles.svelte.js';

/**
 * Loads mode settings from localStorage.
 * If no data is found or the code is running on the server side, it returns default values.
 *
 * @returns {object} An object containing the application's mode settings.
 */
const loadModesFromLocalStorage = () => {
	if (typeof window === 'undefined') return {}; // Prevents errors in a server-side environment
	const storedModes = localStorage.getItem('modes');
	return storedModes
		? JSON.parse(storedModes)
		: {
				icoGlypherMode: false,
				devMode: false,
				designerMode: false,
				colorMode: 'grey'
			};
};

// Retrieve stored mode settings
const modes = loadModesFromLocalStorage();

/**
 * Saves the current mode settings to localStorage for persistence.
 */
const saveModesToLocalStorage = () => {
	localStorage.setItem('modes', JSON.stringify(modes));
};

/**
 * Toggles the state of a given mode and updates localStorage.
 *
 * @param {string} mode - The name of the mode to toggle.
 */
const toggleMode = (mode) => {
	modes[mode] = !modes[mode];
	saveModesToLocalStorage();
};

/**
 * Updates the application's color mode and stores the selection in localStorage.
 *
 * @param {string} color - The selected color mode (accepted values: "light", "dark", "grey").
 */
const changeColorMode = (color) => {
	modes.colorMode = color;
	saveModesToLocalStorage();
	document.body.setAttribute('data-color-mode', color);
	applySvgUserStyles();
};

/**
 * Stores user-defined styles for IcoGlyphs.
 */
let icoGlyphUserCustomStyles = $state({});
let useStyleForSvgDownload = $state(true);

/**
 * Global application state.
 *
 * @typedef {object} appState
 * @property {object} colorMode - Controls the application's color mode.
 * @property {function} colorMode.change - Updates the color mode and saves the preference.
 *    Available options: 'grey' (default), 'dark', 'light'.
 * @property {object} icoGlyphUserSettings - Contains user-defined style settings.
 * @property {object} icoGlyphUserSettings.style - Stores custom styles for IcoGlyphs.
 * @property {boolean} icoGlyphUserSettings.useStyleForSvgDownload - Determines if styles should be applied during SVG download.
 */
let appState = $state({
	modes: {
		icoGlypherMode: {
			value: modes.icoGlypherMode,
			toggle: () => toggleMode('icoGlypherMode')
		},
		devMode: {
			value: modes.devMode,
			toggle: () => toggleMode('devMode')
		},
		designerMode: {
			value: modes.designerMode,
			toggle: () => toggleMode('designerMode')
		},
		colorMode: {
			value: modes.colorMode,
			change: changeColorMode
		}
	},
	icoGlyphUserSettings: {
		style: icoGlyphUserCustomStyles,
		useStyleForSvgDownload: useStyleForSvgDownload
	}
});

export default appState;
