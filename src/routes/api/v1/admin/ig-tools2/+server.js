import { json } from '@sveltejs/kit';
import { JSONFilePreset } from 'lowdb/node';

function validateIcoglyph(obj, existingData, { isUpdate = false } = {}) {
	if (!obj) throw new Error('Object is empty');

	// ID is required for POST and must be unique
	if (!obj.id) {
		throw new Error('Missing ID');
	}
	if (!isUpdate && existingData.find((item) => item.id === obj.id)) {
		throw new Error(`ID already exists: ${obj.id}`);
	}

	// aliases is required for POST
	if (!isUpdate) {
		if (!obj.aliases || !Array.isArray(obj.aliases) || obj.aliases.length === 0) {
			throw new Error('aliases is required and must be a non-empty array');
		}
	} else if (obj.aliases && !Array.isArray(obj.aliases)) {
		throw new Error('aliases must be an array');
	}

	if (obj.aliases) {
		for (const alias of obj.aliases) {
			if (existingData.some((item) => item.id !== obj.id && item.aliases.includes(alias))) {
				throw new Error(`Alias already in use: ${alias}`);
			}
		}
	}

	// path is required for POST
	if (!isUpdate) {
		if (!obj.path || !Array.isArray(obj.path) || obj.path.length === 0) {
			throw new Error('path is required and must be a non-empty array');
		}
	} else if (obj.path && !Array.isArray(obj.path)) {
		throw new Error('path must be an array');
	}

	if (obj.path) {
		for (const p of obj.path) {
			if (typeof p !== 'string') {
				throw new Error('Each path entry must be a string');
			}
		}
	}

	// is_public is required for POST
	if (!isUpdate) {
		if (typeof obj.is_public !== 'boolean') {
			throw new Error('is_public is required and must be a boolean');
		}
	} else if ('is_public' in obj && typeof obj.is_public !== 'boolean') {
		throw new Error('is_public must be a boolean');
	}

	// tags (optional, must be array of strings)
	if (obj.tags !== undefined) {
		if (!Array.isArray(obj.tags)) {
			throw new Error('tags must be an array');
		}
		for (const tag of obj.tags) {
			if (typeof tag !== 'string') {
				throw new Error('Each tag must be a string');
			}
		}
	}

	// categories (optional, must be array of strings)
	if (obj.categories !== undefined) {
		if (!Array.isArray(obj.categories)) {
			throw new Error('categories must be an array');
		}
		for (const category of obj.categories) {
			if (typeof category !== 'string') {
				throw new Error('Each category must be a string');
			}
		}
	}
}

export async function POST({ request }) {
	const obj = await request.json();
	const defaultData = { svgData: [] };
	const db = await JSONFilePreset('src/lib/library/DBtest.json', defaultData);

	try {
		validateIcoglyph(obj, db.data.svgData);
	} catch (err) {
		return json({ success: false, error: err.message }, { status: 400 });
	}

	await db.update(({ svgData }) => {
		svgData.push(obj);
	});

	return json({ success: true });
}

export async function PATCH({ request }) {
	const updated = await request.json();
	const db = await JSONFilePreset('src/lib/library/DBtest.json', { svgData: [] });

	try {
		validateIcoglyph(updated, db.data.svgData, { isUpdate: true });
	} catch (err) {
		return json({ success: false, error: err.message }, { status: 400 });
	}

	await db.update(({ svgData }) => {
		const item = svgData.find((entry) => entry.id === updated.id);
		if (item) {
			if (updated.aliases !== undefined) item.aliases = updated.aliases;
			if (updated.path !== undefined) item.path = updated.path;
			if (updated.tags !== undefined) item.tags = updated.tags;
			if (updated.is_public !== undefined) item.is_public = updated.is_public;
		}
	});

	return json({ success: true });
}
