import icoGlyphs from '$lib/index.js';
import icoGlyphsLibrary from '$lib/library/icoGlyphsLibrary.json';

// Function to reverse an array
const reverseArray = (array) => {
	return array.reverse();
};

export const getDefaultHomepageIcons = () => {
	const categoriesUsed = new Map();

	const defaultIcons = Object.keys(icoGlyphs.library).filter((icoGlyphName) => {
		const icoData = icoGlyphs.library[icoGlyphName];
		const aliases = icoData.aliases || [];
		if (aliases.length === 0) return false;

		return icoData;
	});

	categoriesUsed.forEach((icons) => {
		const randomIcon = icons[Math.floor(Math.random() * icons.length)];
		defaultIcons.push(randomIcon);
	});

	return reverseArray(defaultIcons);
};

export const getDefaultHomepageIconsWithAliases = () => {
	const categoriesUsed = new Map();
	const defaultIconsWithAliases = [];

	Object.keys(icoGlyphs.library).forEach((icoGlyphName) => {
		const icoData = icoGlyphs.library[icoGlyphName];
		const aliases = icoData.aliases || [];

		if (aliases.length > 0) {
			defaultIconsWithAliases.push(aliases[0]);
		}
	});

	categoriesUsed.forEach((icons) => {
		const randomIcon = icons[Math.floor(Math.random() * icons.length)];
		defaultIconsWithAliases.push(randomIcon);
	});

	return reverseArray(defaultIconsWithAliases);
};

// >>

// import icoGlyphs from '$lib/index.js';

// // Function to reverse an array
// const reverseArray = (array) => array.reverse();

// export const getDefaultHomepageIcons = () => {
// 	const defaultIcons = icoGlyphs.library
// 		.filter(ico => ico.aliases?.length)
// 		.map(ico => ico.name); // ou un autre champ pertinent

// 	return reverseArray(defaultIcons);
// };

// export const getDefaultHomepageIconsWithAliases = () => {
// 	const defaultIconsWithAliases = icoGlyphs.library
// 		.filter(ico => ico.aliases?.length)
// 		.map(ico => ico.aliases[0]);

// 	return reverseArray(defaultIconsWithAliases);
// };
