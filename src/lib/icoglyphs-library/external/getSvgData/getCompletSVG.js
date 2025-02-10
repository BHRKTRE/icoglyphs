import searchIcoGlyph from "../searchIcoGlyph";
import getPath from "./getPath";
import getSvgAttributes from "./getSvgAttributes";

// All this is deprecated and should be removed or modified

/**
 * @param {string} icoGlyphName - The name of the icoGlyph.
 * @param {string} [version] - The version of the icoGlyph (optional).
 * @returns {string} The complete SVG markup.
 */
function getCompletSVG(icoGlyphName, version) {
  const icoGlyph = searchIcoGlyph(icoGlyphName);
  if (!icoGlyph) return;

  const svgAttributes = getSvgAttributes(icoGlyphName);
  // Convert the attributes to a formatted string
  const svgAttributesString = Object.entries(svgAttributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");

  const path = getPath(icoGlyphName, version);

  return `<svg ${svgAttributesString} stroke="black">
    <path d="${path}" />
  </svg>`;
}

export default getCompletSVG;
