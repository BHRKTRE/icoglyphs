import icoGlyphsLibrary from '../icoGlyphsLibrary.json';

/**
 * @param {string} icoGlyphName - The name or alias of the icoGlyph.
 * @returns {object|null} The icoGlyph object, or null if not found.
 */
function searchIcoGlyph(icoGlyphName) {
	const ig = icoGlyphsLibrary.svgData.find((entry) => entry.aliases?.includes(icoGlyphName));

	if (!ig) {
		console.error(`icoGlyph not found: ${icoGlyphName}`);
		return null;
	}

	return ig;
}

export default searchIcoGlyph;
