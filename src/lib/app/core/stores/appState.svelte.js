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
let modes = loadModesFromLocalStorage(); // Directly load from localStorage

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
// ! toggle function may be suppressed
const toggleMode = (mode) => {
	modes[mode] = !modes[mode];
	saveModesToLocalStorage();

	appState.modes[mode].value = modes[mode];
};

/**
 * Updates the application's color mode and stores the selection in localStorage.
 *
 * @param {string} color - The selected color mode (accepted values: "light", "dark", "grey").
 */
const changeColorMode = (color) => {
	// modes.colorMode = color;
	// saveModesToLocalStorage();
	document.body.setAttribute('data-color-mode', color);

	icoGlyphUserCustomStyles.stroke = storedStyle.stroke
		? storedStyle.stroke
		: strokeColorDependOnMode[color];

	// console.log(icoGlyphUserCustomStyles.stroke, strokeColorDependOnMode[color]);
};

/**
 * Stores user-defined styles for IcoGlyphs (designerMode only).
 */

// Default stroke colors based on mode
const strokeColorDependOnMode = {
	grey: '#e4ebf3',
	light: '#0c0f13',
	dark: '#e4ebf3'
};

// Load user-defined SVG styles from local storage
const loadSvgStyleFromLocalStorage = () => {
	if (typeof window === 'undefined') return {}; // Prevents errors in server-side environments

	const storedStyle = localStorage.getItem('icoGlyphsUserStyle');
	return storedStyle ? JSON.parse(storedStyle) : {};
};

// Retrieve stored styles or set defaults
let storedStyle = loadSvgStyleFromLocalStorage();

/**
 * Updates the user styles when color mode or other properties change.
 */
const updateUserStyles = () => {
	return {
		stroke: storedStyle.stroke || strokeColorDependOnMode[modes.colorMode],
		'stroke-linejoin': storedStyle['stroke-linejoin'] || 'round',
		'stroke-linecap': storedStyle['stroke-linecap'] || 'round',
		'stroke-width': storedStyle['stroke-width'] || 6,
		'stroke-opacity': storedStyle['stroke-opacity'] || 1,
		fill: storedStyle.fill || 'none'
	};
};

// Define the final user custom styles for IcoGlyphs with defaults
let icoGlyphUserCustomStyles = $state(updateUserStyles());

// State for managing style usage in SVG downloads
let useStyleForSvgDownload = true;

const resetStyle = () => {
	localStorage.removeItem('icoGlyphsUserStyle');
};

/**
 * Search bar value
 */
let searchBarValue = '';

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
 * @property {string} searchBarValue
 */
let appState = $state({
	modes: {
		icoGlypherMode: {
			value: modes.icoGlypherMode,
			// toggle function may be suppressed
			toggle: () => toggleMode('icoGlypherMode')
		},
		devMode: {
			value: modes.devMode,
			// toggle function may be suppressed
			toggle: () => toggleMode('devMode')
		},
		designerMode: {
			value: modes.designerMode,
			// toggle function may be suppressed
			toggle: () => {
				toggleMode('designerMode');
				resetStyle();
			}
		},
		colorMode: {
			value: modes.colorMode,
			change: changeColorMode
		}
	},
	icoGlyphUserSettings: {
		style: icoGlyphUserCustomStyles,
		useStyleForSvgDownload: useStyleForSvgDownload,
		resetStyle: () => resetStyle()
	},
	searchBarValue: searchBarValue
});

export default appState;
