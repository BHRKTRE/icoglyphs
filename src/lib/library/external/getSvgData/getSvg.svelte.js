import searchIcoGlyph from '../searchIcoGlyph';
import getPath from './getPath';
import getSvgAttributes from './getSvgAttributes';

/**
 * Generates a complete SVG markup string for the given icoGlyph name.
 *
 * @param {string} icoGlyphName - The name of the icoGlyph.
 * @param {Object} [options] - Optional parameters.
 * @param {boolean} [options.simplified=false] - Whether to use simplified path (excluding hidden parts).
 * @returns {string | undefined} The complete SVG markup, or undefined if the glyph is not found.
 */
function getSvg(icoGlyphName, { simplified = false } = {}) {
	const icoGlyph = searchIcoGlyph(icoGlyphName);
	if (!icoGlyph) return;

	const attributes = getSvgAttributes(icoGlyphName);
	const pathData = getPath(icoGlyphName, { simplified }); // Pass simplified directly here

	if (!pathData) return;

	const attributesString = formatAttributes(attributes);

	return `<svg ${attributesString} stroke="black">
	<path d="${pathData}" />
	</svg>`;
}

/**
 * Converts an attributes object to a string for embedding in SVG.
 *
 * @param {Object} attrs - SVG attributes as key-value pairs.
 * @returns {string} - A string of HTML-ready attributes.
 */
function formatAttributes(attrs) {
	return Object.entries(attrs)
		.map(([key, value]) => `${key}="${value}"`)
		.join(' ');
}

export default getSvg;
