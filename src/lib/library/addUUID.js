import { readFile, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, './icoGlyphsLibrary.json');
const outputPath = path.join(__dirname, './icoGlyphsLibrary_with_ids.json');

const rawData = await readFile(filePath, 'utf-8');
const data = JSON.parse(rawData);

// Ajouter un UUID à chaque entrée de svgData
for (const key in data.svgData) {
	if (Object.hasOwn(data.svgData, key)) {
		data.svgData[key].id = uuidv4();
	}
}

await writeFile(outputPath, JSON.stringify(data, null, 2), 'utf-8');

console.log(`✅ UUIDs ajoutés avec succès ! Fichier généré : ${outputPath}`);
