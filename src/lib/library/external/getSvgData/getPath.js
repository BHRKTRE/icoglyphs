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
 * getPath('arrow-right');
 * getPath(['arrow-left', '_internal-part'], { simplified: true });
 * getPath(['arrow-left', 'M 0 0 0 0', '_M 1 21 1'], { simplified: true });
 */
function processGlyph(el, simplified) {
	if (typeof el === 'string') {
		let value = el.trim();

		// handle simplified
		if (value.startsWith('_')) {
			if (simplified) return null;
			value = value.slice(1);
		}

		if (value.startsWith('M')) return value;

		const found = searchIcoGlyph(value);
		if (!found) return null;

		return processGlyph(found.path, simplified);
	}

	if (Array.isArray(el)) {
		return el
			.map((item) => processGlyph(item, simplified))
			.filter(Boolean) // remove falsy values (null/undefined)
			.join(' ');
	}

	return null;
}

function getPath(pathData, { simplified = false } = {}) {
	return processGlyph(pathData, simplified);
}

export default getPath;
