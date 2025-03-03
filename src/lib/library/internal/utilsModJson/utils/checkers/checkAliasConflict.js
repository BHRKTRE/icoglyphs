/**
 * Checks if any alias already exists in another glyph.
 * @param {array} newAliases - Aliases of the new glyph.
 * @param {object} existingData - The existing JSON data containing all glyphs.
 * @returns {boolean} Returns true if a conflict is found, otherwise false.
 */
function checkAliasConflict(newAliases, existingData) {
	for (const [existingName, glyph] of Object.entries(existingData.svgData)) {
		if (glyph.aliases) {
			for (const alias of newAliases) {
				if (glyph.aliases.includes(alias)) {
					console.error(`Error: Alias "${alias}" is already used by "${existingName}".`);
					return true;
				}
			}
		}
	}
	return false;
}

export default checkAliasConflict;
