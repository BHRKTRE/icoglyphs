import { error } from '@sveltejs/kit';
import icoGlyphsDocs from '../icoGlyphsDocs.json';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const { docSlug } = params;

	const docData = docSlug
		? {
				slug: docSlug,
				...icoGlyphsDocs[docSlug]
			}
		: null;

	console.log(docData);

	if (!docData) error(404);

	return {
		docData
	};
}
