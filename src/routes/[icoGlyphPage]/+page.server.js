import { error } from '@sveltejs/kit';
import icoGlyphs from 'icoglyphs';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const icoGlyphKey = Object.keys(icoGlyphs.library().svgData).find(
		(key) => key === params.icoGlyphPage
	);

	const icoGlyphData = { name: icoGlyphKey, ...icoGlyphs.library().svgData[icoGlyphKey] };

	if (icoGlyphKey) {
		return icoGlyphData;
	}

	error(404, 'IcoGlyph not found');
}
