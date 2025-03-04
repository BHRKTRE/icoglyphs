import readAndUpdateJSON from './utils/fileUtils/readAndUpdateJSON.js'; // Import of the centralized function
import checkAliasConflict from './utils/checkers/checkAliasConflict.js';

/**
 * Update Tags or Aliases
 * _________________________
 *
 * @param {string} glyphName - The name of the icoGlyph to update.
 * @param {array} arrayToAdd - The array of elements to add.
 * @param {string} type - The type of element to add: "tags" or "aliases".
 * @param {string} action - The action to perform: "add" or "remove".
 */
async function updateArray(glyphName, array, type, action) {
	if (!Array.isArray(array)) {
		console.error('Error: Elements must be in an array.');
		return;
	}
	const validTypes = ['tags', 'aliases']; // Add 'aliases' to the valid types
	if (!validTypes.includes(type)) {
		console.error(`Error: The type "${type}" is invalid.`);
		return;
	}

	await readAndUpdateJSON(async (jsonData) => {
		const glyph = jsonData.svgData[glyphName];

		// Check if the glyph exists
		if (!glyph) {
			console.error(`Error: The icoGlyph with the name "${glyphName}" does not exist.`);
			return;
		}

		let existingArray;
		// If type is 'tags', use metadata, else use aliases directly
		if (type === 'tags') {
			existingArray = glyph.metadata?.tags || [];
		} else if (type === 'aliases') {
			existingArray = glyph.aliases || [];
		}

		// Check if there are alias conflicts
		if (type === 'aliases' && action === 'add') {
			const isConflict = checkAliasConflict(array, jsonData);
			if (isConflict) {
				console.error('Cannot add aliases due to conflict.');
				return;
			}
		}

		let updatedArray;

		// Add or remove based on the action
		if (action === 'add') {
			updatedArray = [...new Set([...existingArray, ...array])];
		} else if (action === 'remove') {
			updatedArray = existingArray.filter((item) => !array.includes(item));
		} else {
			console.error(`Error: Action "${action}" is invalid. Use "add" or "remove".`);
			return;
		}

		// Update the array in the correct place (metadata or directly in aliases)
		if (type === 'tags') {
			glyph.metadata.tags = updatedArray;
		} else if (type === 'aliases') {
			glyph.aliases = updatedArray;
		}

		console.log(`Elements have been successfully ${action === 'add' ? 'added' : 'removed'}.`);
	});
}

/**
 * @title - Modify tags or aliases
 * _______________________________________
 *
 * @param {string} icoGlyphName
 * @param {array} keysToPush - Keywords or aliases to add
 * @param {"tags" | "aliases"} arrayTypesToPush - Specify where to push keywords (tags or aliases)
 * @param {"add" | "remove"} action - Specify whether to add or remove keywords
 *
 */

const optionsForPushingInArray = {
	icoGlyphName: 'l__d_br_tl__s_7', // The name of the icoGlyph
	keysToPush: ['newAlias'], // The array of tags/aliases to add
	arrayTypesToPush: 'aliases', // Specify 'tags' or 'aliases'
	action: 'add' // Action can be 'add' or 'remove'
};

/** @function - Add these keywords */
updateArray(
	optionsForPushingInArray.icoGlyphName,
	optionsForPushingInArray.keysToPush,
	optionsForPushingInArray.arrayTypesToPush,
	optionsForPushingInArray.action
);
