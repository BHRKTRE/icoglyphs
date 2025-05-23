import { error } from '@sveltejs/kit';
import icoGlyphs from '$lib/index.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { icoGlyphNameSlug } = params;
	const library = icoGlyphs.library;

	if (library[icoGlyphNameSlug]) {
		return {
			name: icoGlyphNameSlug,
			...library[icoGlyphNameSlug]
		};
	}

	for (const [key, value] of Object.entries(library)) {
		if (value.aliases && value.aliases.includes(icoGlyphNameSlug)) {
			return {
				name: key,
				...value
			};
		}
	}

	throw error(404, 'IcoGlyph not found');
}
