import { searchBarIcoglyphs } from '$lib/app/core/utils/searchBarIcoglyphs.svelte.js';

import icoGlyphsLibrary from '$lib/library/icoGlyphsLibrary.json';

let iconDataEx = {
	key: 'ex1',
	path: 'M -15 -20 L -35 0 L -15 20'
};

export function createNewIg() {}

export function updateIg() {
	console.log('update');
}
