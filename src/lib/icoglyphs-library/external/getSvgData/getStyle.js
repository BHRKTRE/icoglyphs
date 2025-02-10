/**
 * @dev In some cases, it's necessary to convert the object to a string.
 * @returns {object} The default style to set in the SVG header.
 */
function getIcoGlyphDefaultStyle() {
  return {
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 3,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    width: "100%",
    height: "100%",
  };
}

export default getIcoGlyphDefaultStyle;
