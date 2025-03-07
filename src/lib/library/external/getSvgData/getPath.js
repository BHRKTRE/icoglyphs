import searchIcoGlyph from '../searchIcoGlyph';

/**
 * Retrieves the path of an icon glyph. If the input is an array of glyph names,
 * it processes each one recursively.
 *
 * @param {string | string[]} icoGlyphName - The name of the icon glyph or an array of glyph names.
 * @returns {string | undefined} The path of the icon glyph as a string, or undefined if the glyph is not found.
 */
function getPath(icoGlyphName) {
	// If icoGlyphName is already an SVG path (starts with 'M'), return it immediately
	if (typeof icoGlyphName === 'string' && icoGlyphName.trim().startsWith('M')) {
		return icoGlyphName;
	}

	// If icoGlyphName is an array, process each element recursively
	if (Array.isArray(icoGlyphName)) {
		return icoGlyphName
			.map((glyphOrPath) => getPath(glyphOrPath)) // Recursively process each element
			.join(' '); // Join all paths into a single string
	}

	// Search for the icon glyph in the library
	const icoGlyph = searchIcoGlyph(icoGlyphName);
	if (!icoGlyph) return;

	const { path } = icoGlyph;

	// If the path is a single string and already an SVG path, return it directly
	if (typeof path === 'string' && path.trim().startsWith('M')) {
		return path;
	}

	// If path is an array, process each sub-glyph recursively
	if (Array.isArray(path)) {
		return path
			.map((subGlyphName) => getPath(subGlyphName)) // Recursive call
			.join(' ');
	}

	return undefined;
}

export default getPath;
