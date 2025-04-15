import searchIcoGlyph from '../searchIcoGlyph';

/**
 * Retrieves the path of an icon glyph. If the input is an array of glyph names,
 * it processes each one recursively.
 *
 * @param {string | string[]} icoGlyphName - The name of the icon glyph or an array of glyph names.
 * @param {Object} [options] - Optional parameters.
 * @param {boolean} [options.simplified=false] - If true, hidden elements (starting with '_') are excluded.
 * @returns {string | undefined} The path of the icon glyph as a string, or undefined if the glyph is not found.
 */
function getPath(icoGlyphName, { simplified = false } = {}) {
	// If it's already a path string
	if (typeof icoGlyphName === 'string' && icoGlyphName.trim().startsWith('M')) {
		return icoGlyphName;
	}

	// If it's an array, process recursively
	if (Array.isArray(icoGlyphName)) {
		return icoGlyphName
			.map((glyphOrPath) => {
				if (typeof glyphOrPath === 'string' && glyphOrPath.trim().startsWith('_')) {
					if (simplified) return null; // skip if simplified
					return glyphOrPath.trim().slice(1); // remove "_" if keeping
				}
				return getPath(glyphOrPath, { simplified });
			})
			.filter(Boolean) // remove nulls
			.join(' ');
	}

	// Lookup glyph
	const icoGlyph = searchIcoGlyph(icoGlyphName);
	if (!icoGlyph) return;

	const { path } = icoGlyph;

	// If it's a raw path string
	if (typeof path === 'string' && path.trim().startsWith('M')) {
		return path;
	}

	// If it's an array
	if (Array.isArray(path)) {
		return path
			.map((subGlyph) => {
				if (typeof subGlyph === 'string' && subGlyph.trim().startsWith('_')) {
					if (simplified) return null;
					return subGlyph.trim().slice(1); // remove "_"
				}
				return getPath(subGlyph, { simplified });
			})
			.filter(Boolean)
			.join(' ');
	}

	return undefined;
}

export default getPath;
