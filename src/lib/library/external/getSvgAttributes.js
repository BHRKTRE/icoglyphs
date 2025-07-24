import searchIcoGlyph from './searchIcoGlyph';

/**
 * @dev In some cases, it is necessary to convert the object to a string.
 * @param {string} icoGlyphName - The name of the icoGlyph.
 * @returns {object} The attributes to set in the SVG header.
 */
function getSvgAttributes(icoGlyphName) {
	if (!icoGlyphName)
		return {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '-50 -50 100 100',
			focusable: false, // ?
			// 'data-icoGlyph': icoGlyphName,
			role: 'img'
			// "aria-label": icoGlyphName,
		};

	const icoGlyph = searchIcoGlyph(icoGlyphName);
	if (!icoGlyph) return;

	// const ariaLabel = icoGlyph.publicName
	//   ? icoGlyph.publicName
	//   : icoGlyphName;

	const viewBox =
		!icoGlyph.spec || !icoGlyph.spec.viewBox ? '-50 -50 100 100' : icoGlyph.spec.viewBox;

	return {
		xmlns: 'http://www.w3.org/2000/svg',
		viewBox: viewBox,
		focusable: false, // ?
		'data-icoGlyph': icoGlyphName,
		role: 'img'
		// "aria-label": ariaLabel,
	};
}

export default getSvgAttributes;
