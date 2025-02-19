import icoGlyphsLibrary from './icoglyphs-library/icoGlyphsLibrary.json';
import getCompleteSvg from './icoglyphs-library/external/getSvgData/getCompleteSVG';
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

	getCompleteSvg: (icoGlyphName, icoGlyphVersion) => {
		return getCompleteSvg(icoGlyphName, icoGlyphVersion);
	},

	library() {
		return icoGlyphsLibrary;
	}
};

export default icoGlyphs;
