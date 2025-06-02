import { json } from '@sveltejs/kit';
import { JSONFilePreset } from 'lowdb/node';

export async function POST({ request }) {
	const obj = await request.json();
	const defaultData = { svgData: [] };
	const db = await JSONFilePreset('src/lib/library/DBtest.json', defaultData);

	await db.update(({ svgData }) => {
		svgData.push(obj);
	});

	return json({ success: true });
}

export async function PATCH({ request }) {
	const updated = await request.json();
	const db = await JSONFilePreset('src/lib/library/DBtest.json', { svgData: [] });

	await db.update(({ svgData }) => {
		const item = svgData.find((entry) => entry.id === updated.id);
		if (item) {
			if (updated.txt !== undefined) item.txt = updated.txt;
		}
	});

	return json({ success: true });
}
