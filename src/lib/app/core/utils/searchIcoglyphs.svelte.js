import icoGlyphs from '$lib/index.js';

export const searchIcoglyphs = (query) => {
	const lowerQuery = query.trim().toLowerCase();
	if (!lowerQuery) return [];

	const queryWords = lowerQuery.split(/\s+/);

	return Object.keys(icoGlyphs.library().svgData).filter((icoGlyphName) => {
		const icoData = icoGlyphs.library().svgData[icoGlyphName];
		const { metadata } = icoData;
		const aliases = (icoData.aliases || []).map((alias) => alias.toLowerCase());
		const iconText = icoGlyphName.toLowerCase();
		const iconTags = (metadata?.tags ?? []).map((tag) => tag.toLowerCase());
		const iconCategories = (metadata?.categories ?? []).map((cat) => cat.toLowerCase());

		return queryWords.every(
			(word) =>
				iconText.includes(word) ||
				aliases.some((alias) => alias.includes(word)) ||
				iconTags.some((tag) => tag.includes(word)) ||
				iconCategories.some((category) => category.includes(word))
		);
	});
};
