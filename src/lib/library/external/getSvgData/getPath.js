import searchIcoGlyph from '../searchIcoGlyph';

/**
 * Retrieves the final SVG path for an icoglyph or a list of glyphs / path.
 * Recursively resolves nested icoglyphs, arrays, or direct path strings.
 *
 * @param {string | string[]} glyph - The icoglyph name, path, or array of them.
 * @param {boolean} [options.simplified=false] - If true, hidden elements (starting with '_') are excluded.
 * @returns {string | undefined} The resolved SVG path string, or undefined if not found.
 *
 * @example
 * getPath(['arrow-right']);
 * getPath(['arrow-left', '_internal-part'], { simplified: true });
 * getPath(['arrow-left', 'M 0 0 0 0', '_M 1 21 1'], { simplified: true });
 */
function getPath(glyph, { simplified = false } = {}) {
	// Always normalize input to an array
	const items = Array.isArray(glyph) ? glyph : [glyph];

	const result = items
		.map((item) => {
			if (typeof item !== 'string') return null;

			let value = item.trim();

			// Skip if simplified and starts with '_'
			if (value.startsWith('_')) {
				if (simplified) return null;
				value = value.slice(1);
			}

			// If it's a raw SVG path
			if (value.startsWith('M')) return value;

			// If it's a named glyph
			const found = searchIcoGlyph(value);
			if (!found || !found.path) return null;

			// Recursively process resolved path
			return getPath(found.path, { simplified });
		})
		.filter(Boolean) // remove null/undefined
		.join(' ');

	return result;
}

export default getPath;
