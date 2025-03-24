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
	name: 'discord_logo',

	// aliases: ['github'],

	path: 'M -13 21 l -4.59 6.52 c -3.37 -0.11 -15.54 -2.27 -20 -10 c 0 -16.48 6.49 -35.99 9.67 -38.9 c 6.59 -5.24 17.33 -6.1 17.33 -6.1 s 1.03 1.84 1.11 3.97 c 4.09 -0.8 7.57 -0.97 9.39 -0.97 c 1.84 0 5.37 0.17 9.51 1 c 0.06 -2.15 0.99 -4 0.99 -4 s 10.74 0.86 17.33 6.1 c 3.18 2.91 9.67 22.42 9.67 38.9 c -4.45 7.73 -16.63 9.89 -20 10 l -4.59 -6.52 c -3.53 0.88 -7.84 1.52 -12.91 1.52 s -9.38 -0.64 -12.91 -1.52 z M -13 -5 a 1 1 0 0 0 0 13 a 1 1 0 0 0 0 -13 M 13 -5 a 1 1 0 0 0 0 13 a 1 1 0 0 0 0 -13',

	metadata: {
		// tags: ['activated', 'true'],
		// categories: ['Toggle']
		//
		// Keys below may be deprecated
		// author: "L",
		// description: "",
		// publicName: "bot right arrow",
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
