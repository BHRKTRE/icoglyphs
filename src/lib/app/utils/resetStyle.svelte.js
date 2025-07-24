import appState from '$lib/app/appState.svelte.js';

// TODO: There are some duplications with appState. This should be fixed in the future.

const loadSvgStyleFromLocalStorage = () => {
	if (typeof window === 'undefined') return {};

	const storedStyle = localStorage.getItem('icoGlyphsUserStyle');
	return storedStyle ? JSON.parse(storedStyle) : {};
};

const strokeColorDependOnMode = {
	grey: '#e4ebf3',
	light: '#0c0f13',
	dark: '#e4ebf3'
};

const updateUserStyles = () => {
	const storedStyle = loadSvgStyleFromLocalStorage();
	return {
		stroke: storedStyle.stroke || strokeColorDependOnMode[appState.modes.colorMode.value],
		'stroke-linejoin': storedStyle['stroke-linejoin'] || 'round',
		'stroke-linecap': storedStyle['stroke-linecap'] || 'round',
		'stroke-width': storedStyle['stroke-width'] || 6,
		'stroke-opacity': storedStyle['stroke-opacity'] || 1,
		fill: storedStyle.fill || 'none'
	};
};

export function resetStyle() {
	localStorage.removeItem('icoGlyphsUserStyle');
	appState.icoGlyphUserSettings.style = updateUserStyles();
}
