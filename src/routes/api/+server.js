import icoGlyphs from '$lib/index.js';

export async function GET({ url }) {
	const name = url.searchParams.get('name');
	const get = url.searchParams.get('get');
	const simplified = url.searchParams.get('simplified') === 'true';

	if (name && typeof name !== 'string') {
		return new Response(JSON.stringify({ error: 'The "name" parameter must be a string.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
		});
	}

	if (name && name.length > 50) {
		return new Response(JSON.stringify({ error: 'The "name" parameter is too long.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
		});
	}

	if (get && !['path', 'attributes', 'style', 'svg'].includes(get)) {
		return new Response(
			JSON.stringify({
				error: 'Invalid value for "get". Allowed values are "path", "attributes", "style", "svg".'
			}),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
			}
		);
	}

	let data;
	let contentType = 'application/json';

	try {
		const methods = {
			path: icoGlyphs.getPath,
			attributes: icoGlyphs.getSvgAttributes,
			style: icoGlyphs.getIcoGlyphDefaultStyle,
			svg: icoGlyphs.getSvg,
			default: icoGlyphs.library
		};

		if (get === 'path') {
			data = methods.path(name, { simplified });
		} else if (get === 'svg') {
			data = methods['svg'](name, { simplified });
			contentType = 'image/svg+xml'; // switch here only for svg
		} else if (get) {
			data = methods[get](name);
		} else {
			data = methods.default();
		}

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

	return new Response(contentType === 'application/json' ? JSON.stringify(data) : data, {
		headers: {
			'Content-Type': contentType,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET'
		}
	});
}
