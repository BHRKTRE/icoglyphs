import { JSONFilePreset } from 'lowdb/node';

export async function POST({ request }) {
	const msg = await request.json();

	const defaultData = { igs: [] };
	const db = await JSONFilePreset('./src/lib/library/libr2.json', defaultData);

	// Alternatively you can call db.write() explicitely later
	// to write to db.json
	db.data.igs.push(msg);
	await db.write();

	return new Response(JSON.stringify({ success: true, added: msg }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}
