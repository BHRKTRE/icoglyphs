import { readFileSync, writeFileSync } from 'fs';

// Charger le fichier JSON
const data = JSON.parse(readFileSync('./icoGlyphsLibrary.json', 'utf-8'));

// Modifier chaque icône
data.svgData = data.svgData.map((icon) => {
	const newIcon = {};

	// Copier toutes les paires clé/valeur existantes
	for (const [key, value] of Object.entries(icon)) {
		newIcon[key] = value;
	}

	// Ajouter isPublic à la fin
	newIcon.isPublic = true;

	return newIcon;
});

// Écrire le nouveau JSON dans un fichier
writeFileSync('icons_with_public.json', JSON.stringify(data, null, 2), 'utf-8');

console.log("Champ 'isPublic: true' ajouté avec succès à la fin de chaque objet.");
