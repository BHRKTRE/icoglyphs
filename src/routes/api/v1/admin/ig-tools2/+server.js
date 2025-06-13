import { json } from '@sveltejs/kit';
import { Low } from 'lowdb';
import { CompactJSONFile } from './CompactJSONFile.js';
import { validateIcoglyph } from './validateIcoglyph.js';

const filePath = 'src/lib/library/DBtest.json';

export async function POST({ request }) {
	const obj = await request.json();
	const adapter = new CompactJSONFile(filePath);
	const db = new Low(adapter, { svgData: [] });
	await db.read();

	try {
		validateIcoglyph(obj, db.data.svgData);
	} catch (err) {
		return json({ success: false, error: err.message }, { status: 400 });
	}

	db.data.svgData.push(obj);
	await db.write();

	return json({ success: true });
}

export async function PATCH({ request }) {
	const updated = await request.json();
	const adapter = new CompactJSONFile(filePath);
	const db = new Low(adapter, { svgData: [] });
	await db.read();

	try {
		validateIcoglyph(updated, db.data.svgData, { isUpdate: true });
	} catch (err) {
		return json({ success: false, error: err.message }, { status: 400 });
	}

	const item = db.data.svgData.find((entry) => entry.id === updated.id);
	if (item) {
		if (updated.aliases !== undefined) item.aliases = updated.aliases;
		if (updated.path !== undefined) item.path = updated.path;
		if (updated.tags !== undefined) item.tags = updated.tags;
		if (updated.categories !== undefined) item.categories = updated.categories;
		if (updated.is_public !== undefined) item.is_public = updated.is_public;
	}

	await db.write();

	return json({ success: true });
}
