import icoGlyphConstructor from './utils/icoGlyphConstructor.js'; // Import of the IcoGlyph class
import readAndUpdateJSON from './utils/fileUtils/readAndUpdateJSON.js'; // Import of the centralized function
import checkAliasConflict from './utils/checkers/checkAliasConflict.js';

/**
 * Adds a new IcoGlyph to the JSON data.
 *
 * @param {object} glyphData - Data of the element to add. Parameters can be partial (default values will be used).
 */
async function addNewIcoGlyph(glyphData) {
	return readAndUpdateJSON(async (jsonData) => {
		// Check if a name is provided, otherwise return an error
		if (!glyphData.name) {
			console.error('Error: The glyph must have a name.');
			return;
		}

		// Check if an element with the same name already exists
		if (jsonData.svgData.hasOwnProperty(glyphData.name)) {
			console.error(`Error: An element with the name "${glyphData.name}" already exists.`);
			return;
		}

		// Check if a similar path already exists in the dataset
		const isDuplicatePath = Object.values(jsonData.svgData).some(
			(existingGlyph) => existingGlyph.path === glyphData.path
		);

		if (isDuplicatePath) {
			console.error('Error: A glyph with the same path already exists.');
			return;
		}

		// Ensure aliases do not exist in other glyphs
		if (glyphData.aliases && checkAliasConflict(glyphData.aliases, jsonData)) {
			console.error(`Failed to add "${glyphData.name}" due to alias conflict.`);
			return;
		}

		const newGlyph = new icoGlyphConstructor(glyphData);

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
 *    @param {string|array}
 *
 * * aliases
 *    @param {array} - optional - list of aliases names
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
	name: 'v1__p_c_b__d_t__s_4_2',

	// aliases: ['home-page'],

	path: 'M -20 20 L 0 0 L 20 20',

	metadata: {
		// tags: ['gray', 'grey', 'ashen'],
		// categories: ['Color-mode']
		//
		// publicName: "bot right arrow",
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
