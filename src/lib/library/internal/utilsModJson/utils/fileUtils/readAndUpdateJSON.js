import fs from 'fs/promises';
import pathOfIcoGlyphsLibrary from './pathOfIcoGlyphsLibrary.js';
import { rl, closeReadLine } from './readLine.js';

/**
 * Error handling function
 * _________________________
 *
 * @param {error} err - The error to handle.
 */
function handleError(err) {
	console.error('Error:', err);
}

/**
 * Writes data to a JSON file, with arrays on a single line.
 * @param {object} jsonData - The data to write to the file.
 */
async function writeJSON(jsonData) {
	try {
		// Converts the JSON object to a string with arrays formatted on one line.
		let jsonString = JSON.stringify(jsonData, null, 4);

		// Replaces multi-line arrays with single-line arrays.
		jsonString = jsonString.replace(/\[\s*([\s\S]*?)\s*\]/g, (match, group) => {
			const compactArray = group
				.split('\n')
				.map((line) => line.trim())
				.join(' ');
			return `[${compactArray}]`;
		});

		await fs.writeFile(pathOfIcoGlyphsLibrary, jsonString, 'utf8');
		console.log(`JSON file updated: ${pathOfIcoGlyphsLibrary}`);
	} catch (err) {
		handleError(err);
		throw err; // Rethrow the error after logging it
	}
}

/**
 * Reads a JSON file and returns the data as an object.
 * @returns {promise<object>} - The data from the JSON file.
 */
async function readJSON() {
	try {
		const data = await fs.readFile(pathOfIcoGlyphsLibrary, 'utf8');
		return JSON.parse(data);
	} catch (err) {
		handleError(err);
		throw err; // Rethrow the error after logging it
	}
}

/**
 * Reads and updates the JSON file using the provided update function.
 * @param {function} updateFunction - The function that updates the JSON data.
 */
async function readAndUpdateJSON(updateFunction) {
	try {
		let jsonData = await readJSON();

		await updateFunction(jsonData); // Update data with the provided function
		await writeJSON(jsonData);
	} catch (err) {
		handleError(err); // Error handling is centralized here
	} finally {
		closeReadLine(); // Always close the read line
	}
}

export default readAndUpdateJSON;
