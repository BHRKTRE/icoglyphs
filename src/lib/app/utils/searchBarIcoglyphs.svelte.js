import icoGlyphs from '$lib/index.js';

export const searchBarIcoglyphs = (query) => {
	const lowerQuery = query.trim().toLowerCase();
	if (!lowerQuery) return [];

	const queryWords = lowerQuery.split(/\s+/);

	return Object.keys(icoGlyphs.library).filter((icoGlyphName) => {
		const icoData = icoGlyphs.library[icoGlyphName];
		const aliases = (icoData.aliases || []).map((alias) => alias.toLowerCase());
		const iconText = icoGlyphName.toLowerCase();
		const iconTags = (icoData.tags ?? []).map((tag) => tag.toLowerCase());
		const iconCategories = (icoData.categories ?? []).map((cat) => cat.toLowerCase());

		return queryWords.every(
			(word) =>
				iconText.includes(word) ||
				aliases.some((alias) => alias.includes(word)) ||
				iconTags.some((tag) => tag.includes(word)) ||
				iconCategories.some((category) => category.includes(word))
		);
	});
};
