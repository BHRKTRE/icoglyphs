import icoglyphsDB from './library/icoglyphsDB.json';
import getSvg from './library/external/getSvg.svelte.js';
import getPath from './library/external/getPath';
import getSvgAttributes from './library/external/getSvgAttributes';
import searchIcoGlyph from './library/external/searchIcoGlyph';

const icoGlyphs = {
	getPath: (icoGlyphName, simplified = {}) => {
		return getPath(icoGlyphName, simplified);
	},

	getSvgAttributes: (icoGlyphName) => {
		return getSvgAttributes(icoGlyphName);
	},

	getSvg: (icoGlyphName, options = {}) => {
		return getSvg(icoGlyphName, options);
	},

	searchIcoGlyph: (icoGlyphName) => {
		return searchIcoGlyph(icoGlyphName);
	},

	// rename library to db
	library: icoglyphsDB.svgData
};

export default icoGlyphs;
