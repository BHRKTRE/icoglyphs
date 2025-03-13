import appState from '$lib/app/core/stores/appState.svelte.js';

export function applySvgUserStyles() {
	const strokeColorDependOfMode = {
		grey: '#e4ebf3',
		light: '#0c0f13',
		dark: '#e4ebf3'
	};

	const modes = JSON.parse(localStorage.getItem('modes'));
	const themeValue = modes ? modes.colorMode : 'grey';

	const savedStyle = localStorage.getItem('icoGlyphsUserStyle');
	if (savedStyle) {
		appState.icoGlyphUserSettings.style = JSON.parse(savedStyle);
	} else {
		appState.icoGlyphUserSettings.style = {
			stroke: strokeColorDependOfMode[themeValue],
			'stroke-linejoin': 'round',
			'stroke-linecap': 'round',
			'stroke-width': 6,
			'stroke-opacity': 1,
			fill: 'none'
		};
	}

	const useStyleForSvgDownload = localStorage.getItem('useStyleForSvgDownload');
	if (useStyleForSvgDownload) {
		appState.icoGlyphUserSettings.useStyleForSvgDownload = JSON.parse(useStyleForSvgDownload);
	}
}
