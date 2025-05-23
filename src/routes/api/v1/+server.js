import icoGlyphs from '$lib/index.js';

// TODO use import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const name = url.searchParams.get('name');
	const get = url.searchParams.get('get');
	const simplified = url.searchParams.get('simplified') === 'true';
	const styleParam = url.searchParams.get('style');

	// Setup style
	let style = {};
	if (styleParam) {
		try {
			style = JSON.parse(decodeURIComponent(styleParam));
		} catch (error) {
			return new Response(
				JSON.stringify({
					error: 'Invalid "style" parameter format.'
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
				}
			);
		}
	}

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
			svg: icoGlyphs.getSvg,
			default: icoGlyphs.library
		};

		if (get === 'path') {
			data = methods.path(name, { simplified });
		} else if (get === 'svg') {
			data = methods['svg'](name, { simplified, style });
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

/**
 * |> get SVG
 * With style
 * http://localhost:5173/api?name=arrow-right&get=svg&style=%7B%22stroke%22%3A%20%22%23e4ebf3%22%2C%20%22stroke-linejoin%22%3A%20%22round%22%2C%20%22stroke-linecap%22%3A%20%22round%22%2C%20%22stroke-width%22%3A%204.6%2C%20%22stroke-opacity%22%3A%201%2C%20%22fill%22%3A%20%22none%22%7D
 *
 * Simplified
 * http://localhost:5173/api?name=arrow-right&get=svg&simplified=true
 *
 */
