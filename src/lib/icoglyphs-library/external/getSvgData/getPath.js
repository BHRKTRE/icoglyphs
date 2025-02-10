import searchIcoGlyph from "../searchIcoGlyph";

/**
 * Retrieves the path of an icon glyph. If the input is an array of glyph names,
 * it processes each one recursively.
 *
 * @param {string | string[]} icoGlyphName - The name of the icon glyph or an array of glyph names.
 * @returns {string | undefined} The path of the icon glyph as a string, or undefined if the glyph is not found.
 */
function getPath(icoGlyphName) {
  // If icoGlyphName is an array, process each element recursively
  if (Array.isArray(icoGlyphName)) {
    return icoGlyphName
      .map((glyphOrPath) =>
        typeof glyphOrPath === "string" && glyphOrPath.startsWith("M")
          ? glyphOrPath
          : getPath(glyphOrPath)
      )
      .join(" ");
  }

  // Search for the icon in searchIcoGlyph
  const icoGlyph = searchIcoGlyph(icoGlyphName);
  if (!icoGlyph) return;

  const { path } = icoGlyph;

  // If path is an array, process each sub-glyph
  if (Array.isArray(path)) {
    return path
      .map((subGlyphNames) =>
        Array.isArray(subGlyphNames)
          ? subGlyphNames
              .map((subGlyphName) =>
                typeof subGlyphName === "string" && subGlyphName.startsWith("M")
                  ? subGlyphName
                  : getPath(subGlyphName)
              )
              .join(" ")
          : getPath(subGlyphNames)
      )
      .join(" ");
  }

  // Return the path if it's a single string
  return path;
}

export default getPath;
