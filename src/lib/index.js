import icoglyphsDB from './library/icoglyphsDB.json';
import getSvg from './library/external/getSvg.svelte.js';
import getPath from './library/external/getPath';
import getSvgAttributes from './library/external/getSvgAttributes';
import searchIcoGlyph from './library/external/searchIcoGlyph';

const icoGlyphs = {
	getPath,
	getSvgAttributes,
	getSvg,
	searchIcoGlyph,
	db: icoglyphsDB.svgData
};

export default icoGlyphs;
