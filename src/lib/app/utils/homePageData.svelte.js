import icoGlyphs from '$lib/index.js';

// Function to reverse an array
const reverseArray = (array) => {
	return array.reverse();
};

// Need to rework this (used in sitemap.xml)
// const getDefaultHomepageIcons = icoGlyphs.library.map((ig) => ig.aliases[0]).reverse();
export const getDefaultHomepageIconsWithAliases = () => {
	const categoriesUsed = new Map();

	const defaultIconsWithAliases = icoGlyphs.library
		.filter((icoData) => (icoData.aliases?.length ?? 0) > 0)
		.map((icoData) => icoData.aliases[0]);

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
