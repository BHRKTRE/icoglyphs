import icoGlyphsLibrary from "../icoGlyphsLibrary.json";

/**
 * @param {string} icoGlyphName - The name of the icoGlyph.
 * @returns {object} The icoGlyph object corresponding to the provided name, or null if not found.
 */
function searchIcoGlyph(icoGlyphName) {
  const icoGlyph = icoGlyphsLibrary.svgData[icoGlyphName];
  if (!icoGlyph) {
    console.error(`icoGlyph not found: ${icoGlyphName}`);
    return null;
  }
  return icoGlyph;
}

export default searchIcoGlyph;
