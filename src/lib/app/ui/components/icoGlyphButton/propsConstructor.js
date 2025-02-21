class PropsConstructor {
	// Define the states as methods
	state1(icoGlyphName, onClickFunction) {
		this.icoGlyphName = icoGlyphName;
		this.onClickFunction = onClickFunction;
	}

	state2(icoGlyphName, onClickFunction) {
		this.icoGlyphName = icoGlyphName;
		this.onClickFunction = onClickFunction;
	}

	state3(icoGlyphName, onClickFunction) {
		this.icoGlyphName = icoGlyphName;
		this.onClickFunction = onClickFunction;
	}

	// Constructor to initialize the state
	constructor(state = 1, icoGlyphName, onClickFunction) {
		// Dynamically set the state based on the input
		if (state === 1) {
			this.state1(icoGlyphName, onClickFunction);
		} else if (state === 2) {
			this.state2(icoGlyphName, onClickFunction);
		} else if (state === 3) {
			this.state3(icoGlyphName, onClickFunction);
		}
	}
}

export default PropsConstructor;

/**
 * Change la couleur de l'icône.
 * @param {string} newColor La nouvelle couleur.
 */
// changeColor(newColor) {
//     this.color = newColor;
// }

// app/core/utils/iconUtils.js
// import IcoGlyph from '../models/IcoGlyph.js';

// const icon = new IcoGlyph(1, 'star', '<svg>...</svg>', 'blue');
// icon.changeColor('red');
