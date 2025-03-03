import icoGlyphConstructor from './utils/icoGlyphConstructor.js'; // Import of the IcoGlyph class
import readAndUpdateJSON from './utils/fileUtils/readAndUpdateJSON.js'; // Import of the centralized function
import checkAliasConflict from './utils/checkers/checkAliasConflict.js';

/**
 * Generates a unique identifier (_xxxx).
 * @returns {string} A unique ID in the format "_xxxx".
 */
function generateUniqueId() {
	return `_${Math.floor(1000 + Math.random() * 9000)}`;
}

/**
 * Adds a new IcoGlyph to the JSON data.
 *
 * @param {object} glyphData - Data of the element to add. Parameters can be partial (default values will be used).
 */
async function addNewIcoGlyph(glyphData) {
	return readAndUpdateJSON(async (jsonData) => {
		// Ensure aliases do not exist in other glyphs
		if (glyphData.aliases && checkAliasConflict(glyphData.aliases, jsonData)) {
			console.error(`Failed to add "${glyphData.name}" due to alias conflict.`);
			return;
		}

		let baseName = glyphData.name || 'default';
		let uniqueName = baseName + generateUniqueId();

		// Ensure the generated name is unique in jsonData.svgData
		while (jsonData.svgData.hasOwnProperty(uniqueName)) {
			uniqueName = baseName + generateUniqueId(); // Regenerate if necessary
		}

		// Update the name in the object
		glyphData.name = uniqueName;

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
	name: '1',

	aliases: ['ii', 'uu'],

	path: 'M 0 -10 A 1 1 0 0 0 0 10 A 1 1 0 0 0 0 -10 M 10 -35 L 35 -35 L 35 -10 M -10 35 L -10 10 L -35 10',

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
