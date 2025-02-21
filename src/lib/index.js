import icoGlyphsLibrary from './library/icoGlyphsLibrary.json';
import getCompleteSvg from './library/external/getSvgData/getCompleteSVG';
import getPath from './library/external/getSvgData/getPath';
import getSvgAttributes from './library/external/getSvgData/getSvgAttributes';
import getIcoGlyphDefaultStyle from './library/external/getSvgData/getStyle';

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
