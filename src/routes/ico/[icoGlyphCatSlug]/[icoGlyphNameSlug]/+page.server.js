import { error } from '@sveltejs/kit';
import icoGlyphs from 'icoglyphs';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { icoGlyphCatSlug, icoGlyphNameSlug } = params;

	const icoGlyphKey = Object.keys(icoGlyphs.library().svgData[icoGlyphCatSlug]?.path || {}).find(
		(key) => key === icoGlyphNameSlug
	);

	const icoGlyphData = icoGlyphKey
		? {
				name: icoGlyphKey,
				...icoGlyphs.library().svgData[icoGlyphCatSlug].path[icoGlyphKey]
			}
		: null;

	if (icoGlyphData) {
		return icoGlyphData;
	}

	throw error(404, 'IcoGlyph not found');
}
