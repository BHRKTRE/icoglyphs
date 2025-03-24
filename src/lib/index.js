import icoGlyphsLibrary from './library/icoGlyphsLibrary.json';
import getCompleteSvg from './library/external/getSvgData/getCompleteSVG';
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

	getCompleteSvg: (icoGlyphName) => {
		return getCompleteSvg(icoGlyphName);
	},
	searchIcoGlyph: (icoGlyphName) => {
		return searchIcoGlyph(icoGlyphName);
	},
	library() {
		return icoGlyphsLibrary;
	}
};

export default icoGlyphs;
