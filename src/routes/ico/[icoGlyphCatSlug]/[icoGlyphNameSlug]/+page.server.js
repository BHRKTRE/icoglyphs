import { error } from '@sveltejs/kit';
import icoGlyphs from 'icoglyphs';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	// Extraire 'fullscreen' et 'icoGlyphName' depuis l'URL.
	const { icoGlyphCatSlug, icoGlyphNameSlug } = params;

	// Vérifier si la catégorie existe dans les données.
	const icoGlyphKey = Object.keys(icoGlyphs.library().svgData[icoGlyphCatSlug]?.path || {}).find(
		(key) => key === icoGlyphNameSlug
	);

	// Construire les données de l'icoGlyph si la clé est trouvée.
	const icoGlyphData = icoGlyphKey
		? {
				name: icoGlyphKey,
				...icoGlyphs.library().svgData[icoGlyphCatSlug].path[icoGlyphKey]
			}
		: null;

	// Si les données sont valides, les retourner, sinon lever une erreur 404.
	if (icoGlyphData) {
		return icoGlyphData;
	}

	throw error(404, 'IcoGlyph not found');
}
