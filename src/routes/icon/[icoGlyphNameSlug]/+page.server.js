import { error } from '@sveltejs/kit';
import icoGlyphs from '$lib/index.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { icoGlyphNameSlug } = params;

	const found = icoGlyphs.db.find(
		(item) => item.aliases && item.aliases.includes(icoGlyphNameSlug)
	);

	if (found) {
		return {
			name: icoGlyphNameSlug,
			...found
		};
	}

	throw error(404, 'IcoGlyph not found');
}
