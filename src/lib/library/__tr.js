import fs from 'fs/promises';
import path from 'path';

async function transformSvgData() {
	const inputPath = path.resolve('./icoGlyphsLibrary.json');
	const outputPath = path.resolve('./icoGlyphsLibrary_array.json');

	try {
		const rawData = await fs.readFile(inputPath, 'utf-8');
		const jsonData = JSON.parse(rawData);

		if (!jsonData.svgData || typeof jsonData.svgData !== 'object') {
			throw new Error(
				'Le fichier JSON ne contient pas de propriété "svgData" ou elle est invalide.'
			);
		}

		const svgArray = Object.entries(jsonData.svgData).map(([key, value]) => {
			// Cloner les autres propriétés
			const { aliases = [], ...rest } = value;

			// Créer un nouvel array avec la clé ajoutée à la fin, sans doublons
			const uniqueAliases = Array.from(new Set([...aliases, key]));

			// Construire un nouvel objet avec "aliases" en premier
			return {
				aliases: uniqueAliases,
				...rest
			};
		});

		const transformedData = {
			...jsonData,
			svgData: svgArray
		};

		await fs.writeFile(outputPath, JSON.stringify(transformedData, null, 2), 'utf-8');
		console.log(`✔️ Transformation terminée. Fichier sauvegardé ici : ${outputPath}`);
	} catch (error) {
		console.error('❌ Erreur lors de la transformation :', error);
	}
}

transformSvgData();
