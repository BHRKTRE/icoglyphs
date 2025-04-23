import icoGlyphsLibrary from './library/icoGlyphsLibrary.json';
import getSvg from './library/external/getSvgData/getSvg.svelte.js';
import getPath from './library/external/getSvgData/getPath';
import getSvgAttributes from './library/external/getSvgData/getSvgAttributes';
import getIcoGlyphDefaultStyle from './library/external/getSvgData/getStyle';
import searchIcoGlyph from './library/external/searchIcoGlyph';

const icoGlyphs = {
	getPath: (icoGlyphName, icoGlyphVersion) => {
		return getPath(icoGlyphName, icoGlyphVersion);
	},

	getSvgAttributes: (icoGlyphName) => {
		return getSvgAttributes(icoGlyphName);
	},

	getIcoGlyphDefaultStyle: () => {
		return getIcoGlyphDefaultStyle();
	},

	getSvg: (icoGlyphName) => {
		return getSvg(icoGlyphName);
	},
	searchIcoGlyph: (icoGlyphName) => {
		return searchIcoGlyph(icoGlyphName);
	},
	library() {
		return icoGlyphsLibrary;
	}
};

export default icoGlyphs;
