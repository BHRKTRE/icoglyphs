import icoGlyphs from '$lib/index.js';
import appState from '$lib/app/core/stores/appState.svelte.js';

const defaultStyleForUserExport = {
	fill: 'none',
	stroke: '#000000',
	'stroke-linecap': 'round',
	'stroke-linejoin': 'round',
	'stroke-opacity': 1
};

function getDefaultStyleForUserExport() {
	return {
		...defaultStyleForUserExport,
		'stroke-width': appState.icoGlyphUserSettings.style['stroke-width']
	};
}

function getStyle() {
	let style = getDefaultStyleForUserExport();

	if (!appState.userSettings.useStyleForExportSvg) {
		style = {};
	} else {
		style = appState.icoGlyphUserSettings.style;
	}

	return style;
}

function getCompletSvg(icoGlyphName) {
	return `	<svg 
    ${Object.entries(icoGlyphs.getSvgAttributes(icoGlyphName))
			.map(([key, value]) => `${key}="${value}"`)
			.join(' ')}   
    ${Object.entries(getStyle())
			.map(([key, value]) => `${key}="${value}"`)
			.join(' ')}>
    
			<path d='${icoGlyphs.getPath(icoGlyphName)}' />
		</svg>`;
}

export function downloadPng(icoGlyphName) {
	// Create an offscreen canvas
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	// Set canvas size based on viewBox
	const viewBox = icoGlyphs.getSvgAttributes(icoGlyphName).viewBox.split(' ').map(Number);
	const width = viewBox[2];
	const height = viewBox[3];

	canvas.width = width * 10; // Increase resolution if needed
	canvas.height = height * 10;

	// Convert SVG string to image
	const img = new Image();
	const svgBlob = new Blob([getCompletSvg(icoGlyphName)], { type: 'image/svg+xml' });
	const url = URL.createObjectURL(svgBlob);

	img.onload = () => {
		context.drawImage(img, 0, 0, canvas.width, canvas.height);

		// Convert canvas to PNG and trigger download
		canvas.toBlob((blob) => {
			const pngUrl = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = pngUrl;
			a.download = `${icoGlyphName}.png`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(pngUrl);
		}, 'image/png');

		URL.revokeObjectURL(url);
	};

	img.src = url;
}

export function downloadSvg(icoGlyphName) {
	const blob = new Blob([getCompletSvg(icoGlyphName)], { type: 'image/svg+xml' });

	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `${icoGlyphName}.svg`;
	document.body.appendChild(a);
	a.click();

	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

export function copySvgToClipBoard(icoGlyphName) {
	navigator.clipboard.writeText(getCompletSvg(icoGlyphName));
}
