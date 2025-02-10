const fs = require("fs").promises;
const pathOficoGlyphsLibrary = require("./pathOfIcoGlyphsLibrary");
const { rl, closeReadLine } = require("./readLine");

/**
 * Error handling function
 * _________________________
 *
 * @param {Error} err - The error to handle.
 */
function handleError(err) {
  console.error("Error:", err);
}

/**
 * Sorts a JSON object or array by keys or properties in alphabetical order.
 * @param {object|array} jsonData - The JSON data to sort.
 * @returns {object|array} - The sorted JSON data.
 */
function sortJSON(jsonData) {
  if (Array.isArray(jsonData)) {
    return jsonData.sort((a, b) => {
      // If it's an array of objects, you can specify the property to sort by:
      // Example: return a.name.localeCompare(b.name); to sort by 'name' property
      return JSON.stringify(a).localeCompare(JSON.stringify(b));
    });
  } else if (typeof jsonData === "object" && jsonData !== null) {
    // Sort the keys of the object alphabetically
    const sortedObject = {};
    Object.keys(jsonData)
      .sort()
      .forEach((key) => {
        sortedObject[key] = jsonData[key];
      });
    return sortedObject;
  }
  return jsonData; // If it's neither an object nor an array, return it as is
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
        .split("\n")
        .map((line) => line.trim())
        .join(" ");
      return `[${compactArray}]`;
    });

    await fs.writeFile(pathOficoGlyphsLibrary, jsonString, "utf8");
    console.log(`JSON file updated: ${pathOficoGlyphsLibrary}`);
  } catch (err) {
    handleError(err);
    throw err; // Rethrow the error after logging it
  }
}

/**
 * Reads a JSON file and returns the data as an object.
 * @returns {Promise<object>} - The data from the JSON file.
 */
async function readJSON() {
  try {
    const data = await fs.readFile(pathOficoGlyphsLibrary, "utf8");
    return JSON.parse(data);
  } catch (err) {
    handleError(err);
    throw err; // Rethrow the error after logging it
  }
}

/**
 * Reads and updates the JSON file using the provided update function.
 * @param {Function} updateFunction - The function that updates the JSON data.
 */
async function readAndUpdateJSON(updateFunction) {
  try {
    let jsonData = await readJSON();

    // Sort JSON data before updating
    jsonData = sortJSON(jsonData);

    await updateFunction(jsonData); // Update data with the provided function
    await writeJSON(jsonData);
  } catch (err) {
    handleError(err); // Error handling is centralized here
  } finally {
    closeReadLine(); // Always close the read line
  }
}

module.exports = readAndUpdateJSON;
