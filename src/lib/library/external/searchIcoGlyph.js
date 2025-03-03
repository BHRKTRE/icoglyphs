import icoGlyphsLibrary from '../icoGlyphsLibrary.json';

/**
 * @param {string} icoGlyphName - The name of the icoGlyph.
 * @returns {object} The icoGlyph object corresponding to the provided name, or null if not found.
 */
function searchIcoGlyph(icoGlyphName) {
	// Search if the key with icoGlyphName exist
	if (icoGlyphsLibrary.svgData[icoGlyphName]) {
		return icoGlyphsLibrary.svgData[icoGlyphName];
	}

	// If not search in aliases
	for (const [key, icoGlyph] of Object.entries(icoGlyphsLibrary.svgData)) {
		if (icoGlyph.aliases && icoGlyph.aliases.includes(icoGlyphName)) {
			return icoGlyph;
		}
	}

	// If not found
	console.error(`icoGlyph not found: ${icoGlyphName}`);
	return null;
}

export default searchIcoGlyph;
