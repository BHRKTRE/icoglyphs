import { error } from '@sveltejs/kit';
import icoGlyphs from '$lib/index.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { icoGlyphNameSlug } = params;

	const icoGlyphData = icoGlyphNameSlug
		? {
				name: icoGlyphNameSlug,
				...icoGlyphs.library().svgData[icoGlyphNameSlug]
			}
		: null;

	if (icoGlyphData) {
		return icoGlyphData;
	}

	throw error(404, 'IcoGlyph not found');
}
