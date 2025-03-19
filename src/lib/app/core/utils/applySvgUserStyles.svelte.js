import appState from '$lib/app/core/stores/appState.svelte.js';

export function applySvgUserStyles() {
	const strokeColorDependOfMode = {
		grey: '#e4ebf3',
		light: '#0c0f13',
		dark: '#e4ebf3'
	};

	// const savedStyle = localStorage.getItem('icoGlyphsUserStyle');
	// if (savedStyle && appState.modes.designerMode.value === true) {
	// 	appState.icoGlyphUserSettings.style = JSON.parse(savedStyle);
	// } else if (savedStyle) {
	// 	appState.icoGlyphUserSettings.style = JSON.parse(savedStyle);
	// 	appState.icoGlyphUserSettings.style.stroke =
	// 		strokeColorDependOfMode[appState.modes.colorMode.value];
	// 	appState.icoGlyphUserSettings.style['stroke-linejoin'] = 'round';
	// 	appState.icoGlyphUserSettings.style['stroke-linecap'] = 'round';
	// 	appState.icoGlyphUserSettings.style['stroke-opacity'] = 1;
	// 	appState.icoGlyphUserSettings.style.fill = 'none';
	// } else {
	// 	appState.icoGlyphUserSettings.style = {
	// 		stroke: strokeColorDependOfMode[appState.modes.colorMode.value],
	// 		'stroke-linejoin': 'round',
	// 		'stroke-linecap': 'round',
	// 		'stroke-width': 6,
	// 		'stroke-opacity': 1,
	// 		fill: 'none'
	// 	};
	// }

	const savedStyle = localStorage.getItem('icoGlyphsUserStyle');
	if (savedStyle) {
		appState.icoGlyphUserSettings.style = JSON.parse(savedStyle);
	} else {
		appState.icoGlyphUserSettings.style = {
			stroke: strokeColorDependOfMode[appState.modes.colorMode.value],
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

export function resetStyle() {
	localStorage.removeItem('icoGlyphsUserStyle');
	applySvgUserStyles();
}
