import globalVarFront from '$lib/globalVarFront.svelte.js';

export function applySvgUserStyles() {
	const strokeColorDependOfMode = {
		grey: '#e4ebf3',
		light: '#0c0f13',
		dark: '#e4ebf3'
	};
	const colorMode = localStorage.getItem('colorMode')
		? JSON.parse(localStorage.getItem('colorMode'))
		: 'grey';

	const savedStyle = localStorage.getItem('icoGlyphsUserStyle');
	if (savedStyle) {
		globalVarFront.icoGlyphUserSettings.style = JSON.parse(savedStyle);
	} else {
		globalVarFront.icoGlyphUserSettings.style = {
			stroke: strokeColorDependOfMode[colorMode],
			'stroke-linejoin': 'round',
			'stroke-linecap': 'round',
			'stroke-width': 6,
			'stroke-opacity': 1,
			fill: 'none'
		};
	}

	const useStyleForSvgDownload = localStorage.getItem('useStyleForSvgDownload');
	if (useStyleForSvgDownload) {
		globalVarFront.icoGlyphUserSettings.useStyleForSvgDownload = JSON.parse(useStyleForSvgDownload);
	}
}
