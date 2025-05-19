import icoGlyphsLibrary from './library/icoGlyphsLibrary.json';
import getSvg from './library/external/getSvgData/getSvg.svelte.js';
import getPath from './library/external/getSvgData/getPath';
import getSvgAttributes from './library/external/getSvgData/getSvgAttributes';
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
	library() {
		return icoGlyphsLibrary;
	}
};

export default icoGlyphs;
