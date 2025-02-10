const readAndUpdateJSON = require("./utils/fileUtils/readAndUpdateJSON"); // Import of the centralized function

/**
 * Update Tags
 * _________________________
 *
 * @param {String} glyphName - The name of the icoGlyph to update.
 * @param {Array} arrayToAdd - The array of elements to add.
 * @param {String} type - The type of element to add: "tags".
 */
async function updateArray(glyphName, array, type, action) {
  if (!Array.isArray(array)) {
    console.error("Error: Elements must be in an array.");
    return;
  }
  const validTypes = ["tags"];
  if (!validTypes.includes(type)) {
    console.error(`Error: The type "${type}" is invalid.`);
    return;
  }

  await readAndUpdateJSON(async (jsonData) => {
    const glyph = jsonData.svgData[glyphName];

    // Check if the glyph exists
    if (!glyph) {
      console.error(
        `Error: The icoGlyph with the name "${glyphName}" does not exist.`
      );
      return;
    }

    const existingArray = glyph.metadata[type] || [];
    let updatedArray;

    // Add or remove based on the action
    if (action === "add") {
      updatedArray = [...new Set([...existingArray, ...array])];
    } else if (action === "remove") {
      updatedArray = existingArray.filter((item) => !array.includes(item));
    } else {
      console.error(
        `Error: Action "${action}" is invalid. Use "add" or "remove".`
      );
      return;
    }

    // Update the array in the metadata
    glyph.metadata[type] = updatedArray;
    console.log(
      `Elements have been successfully ${
        action === "add" ? "added" : "removed"
      }.`
    );
  });
}

/**
 * @title - Modify tags
 * _______________________________________
 *
 * @param {string} icoGlyphName
 * @param {array} keysToPush - Keywords to add
 * @param {"tags"} arrayTypesToPush - Specify where to push keywords
 * @param {"add" | "remove"} action - Specify whether to add or remove keywords
 *
 */

const optionsForPushingInArray = {
  icoGlyphName: "3",

  keysToPush: ["frontier"],

  arrayTypesToPush: "tags",

  action: "add",
};

/** @function - Add these keywords */
updateArray(
  optionsForPushingInArray.icoGlyphName,
  optionsForPushingInArray.keysToPush,
  optionsForPushingInArray.arrayTypesToPush,
  optionsForPushingInArray.action
);
