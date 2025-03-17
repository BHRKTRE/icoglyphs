import icoGlyphsLibrary from '../icoGlyphsLibrary.json';

/**
 * @param {string} icoGlyphName - The name of the icoGlyph.
 * @returns {object|null} An object containing the key and icoGlyph data, or null if not found.
 */
function searchIcoGlyph(icoGlyphName) {
	// Search if the key with icoGlyphName exist
	if (icoGlyphsLibrary.svgData[icoGlyphName]) {
		return { key: icoGlyphName, ...icoGlyphsLibrary.svgData[icoGlyphName] };
	}

	// If not search in aliases
	for (const [key, icoGlyph] of Object.entries(icoGlyphsLibrary.svgData)) {
		if (icoGlyph.aliases && icoGlyph.aliases.includes(icoGlyphName)) {
			return { key, ...icoGlyph };
		}
	}

	// If not found
	console.error(`icoGlyph not found: ${icoGlyphName}`);
	return null;
}

export default searchIcoGlyph;
