import icoGlyphConstructor from './utils/icoGlyphConstructor.js'; // Import of the IcoGlyph class
import readAndUpdateJSON from './utils/fileUtils/readAndUpdateJSON.js'; // Import of the centralized function

/**
 * Adds a new IcoGlyph to the JSON data.
 *
 * @param {object} glyphData - Data of the element to add. Parameters can be partial (default values will be used).
 */
async function addNewIcoGlyph(glyphData) {
	return readAndUpdateJSON(async (jsonData) => {
		const newGlyph = new icoGlyphConstructor(glyphData);

		// Check if the glyph already exists
		if (jsonData.svgData.hasOwnProperty(newGlyph.name)) {
			console.error(`Err: An icoGlyph with the name "${newGlyph.name}" already exists.`);
			return;
		}

		// Add the new glyph to the JSON data
		jsonData.svgData[newGlyph.name] = newGlyph.toJSON();

		console.log(`New element "${newGlyph.name}" added.`);
	});
}

/**
 * @title - Add New Glyph
 * __________________________
 * *
 * @param {string} name - icoGlyph name to add - will be the key object
 *
 * path
 *    @param {object}
 *
 * metadata
 *    @param {array} [metadata.tags] - optional
 *    @param {array} [metadata.categories] - optional - Must start start with capital letters
 *
 *    @param {string} [author='L'] - optional - may be supressed
 *    @param {string} [metadata.userNote] - optional - may be supressed
 *    @param {string} [metadata.devNote] - optional - may be supressed
 *
 * spec
 *    @param {string} [spec.viewBox] - optional - !spec.viewBox ? spec.viewBox = "-50 -50 50 50" : spec.viewBox
 *    @param {string} [spec.public] - optional - may be supressed
 */

const newIcoGlyph = {
	name: '1',
	path: ['yes', 'no'],
	metadata: {
		// tags: ["under", "behind"],
		// categories: ["Under"],
		// publicName: "bot right arrow",
		//
		// author: "L",
		// description: "",
		// notes: {
		// userNote: "",
		// devNote: "",
		// },
	},
	spec: {
		// viewBox: "0 0 90 100",
	}
};
/** @function */
addNewIcoGlyph(newIcoGlyph);
