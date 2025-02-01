import icoGlyphsLibrary from './icoglyphs-library/icoGlyphsLibrary.json';
import getCompletSVG from './icoglyphs-library/external/getSvgData/getCompletSVG';
import getPath from './icoglyphs-library/external/getSvgData/getPath';
import getSvgAttributes from './icoglyphs-library/external/getSvgData/getSvgAttributes';
import getIcoGlyphDefaultStyle from './icoglyphs-library/external/getSvgData/getStyle';

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

	getCompletSVG: (icoGlyphName, icoGlyphVersion) => {
		return getCompletSVG(icoGlyphName, icoGlyphVersion);
	},

	library() {
		return icoGlyphsLibrary;
	}
};

export default icoGlyphs;
