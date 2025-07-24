import icoglyphsDB from './library/icoglyphsDB.json';
import getSvg from './library/external/getSvg.svelte.js';
import getPath from './library/external/getPath.js';
import getSvgAttributes from './library/external/getSvgAttributes.js';
import searchIcoGlyph from './library/external/searchIcoGlyph.js';

const icoGlyphs = {
	getPath,
	getSvgAttributes,
	getSvg,
	searchIcoGlyph,
	db: icoglyphsDB.svgData
};

export default icoGlyphs;
