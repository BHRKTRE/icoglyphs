import searchIcoGlyph from '../searchIcoGlyph';
import getPath from './getPath';
import getSvgAttributes from './getSvgAttributes';

/**
 * @param {string} icoGlyphName - The name of the icoGlyph.
 * @param {Object} [options] - Optional parameters.
 * @param {boolean} [options.simplified=false] - Whether to use simplified path.
 * @returns {string} The complete SVG markup.
 */
function getSvg(icoGlyphName, { simplified = false } = {}) {
	const icoGlyph = searchIcoGlyph(icoGlyphName);
	if (!icoGlyph) return;

	const svgAttributes = getSvgAttributes(icoGlyphName);
	const svgAttributesString = Object.entries(svgAttributes)
		.map(([key, value]) => `${key}="${value}"`)
		.join(' ');

	const path = getPath(icoGlyphName, { simplified });

	return `<svg ${svgAttributesString} stroke="black">
    <path d="${path}" />
  </svg>`;
}

export default getSvg;
