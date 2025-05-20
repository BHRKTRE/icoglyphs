import { JSONFilePreset } from 'lowdb/node';
import { json } from '@sveltejs/kit';

const defaultData = { igs: [] };

export async function POST({ request }) {
	const newIcon = await request.json();

	const db = await JSONFilePreset('./src/lib/library/libr2.json', defaultData);

	// Alternatively you can call db.write() explicitely later
	// to write to db.json
	db.data.igs.push(newIcon);
	await db.write();

	return json({ success: true, added: newIcon });
}
