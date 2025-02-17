import icoGlyphs from '$lib/index.js';

export async function GET({ url }) {
	const name = url.searchParams.get('name');
	const get = url.searchParams.get('get');

	// Validate user input
	if (name && typeof name !== 'string') {
		return new Response(JSON.stringify({ error: 'The "name" parameter must be a string.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
		});
	}
	if (name && name.length > 50) {
		// Limite la longueur de "name"
		return new Response(JSON.stringify({ error: 'The "name" parameter is too long.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
		});
	}

	if (get && !['path', 'attributes', 'style', 'full-svg'].includes(get)) {
		return new Response(
			JSON.stringify({
				error:
					'Invalid value for "get". Allowed values are "path", "attributes", "style", "full-svg".'
			}),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
			}
		);
	}

	let data;

	try {
		const methods = {
			path: icoGlyphs.getPath,
			// /api?name=arrow_right&get=path
			attributes: icoGlyphs.getSvgAttributes,
			style: icoGlyphs.getIcoGlyphDefaultStyle,
			'full-svg': icoGlyphs.getCompletSVG,
			default: icoGlyphs.library
		};

		data = methods[get] ? methods[get](name) : methods['default']();

		data = await Promise.resolve(data);
	} catch (error) {
		return new Response(
			JSON.stringify({
				error: 'An error occurred while fetching the data.',
				details: error.message
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
			}
		);
	}

	// Add CORS headers
	const headers = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET'
	};

	// Return the response with the data
	return new Response(JSON.stringify(data), { headers });
}
